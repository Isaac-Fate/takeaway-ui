"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { pdfjs, Document, Page, Outline, OutlineProps } from "react-pdf";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/types/src/pdf";

import {
  getPdfOutlineEntires,
  PdfOutline,
  PdfOutlineEntry,
} from "./pdf-outline";

// Support for annotation layer
import "react-pdf/dist/Page/AnnotationLayer.css";

// Support for text layer
import "react-pdf/dist/Page/TextLayer.css";

// Set the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
  className?: string;
  src: string;
}

export function PDFViewer({ className, src }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(3);
  const [lastVisitedPageNumber, setLastVisitedPageNumber] = useState<
    number | null
  >(null);
  const [outlineEntries, setOutlineEntries] = useState<PdfOutlineEntry[]>();

  async function onDocumentLoadSuccess(
    document: PDFDocumentProxy,
  ): Promise<void> {
    setNumPages(document.numPages);

    // const outline = await document.getOutline();

    // const entry = outline[0];

    // const destination = await document.getDestination(entry.dest as string);
    // console.debug(destination);

    // Get all outline entries
    const entries = await getPdfOutlineEntires(document);

    // Update the state
    setOutlineEntries(entries);
  }

  function handleItemClick({ pageNumber }: { pageNumber: number }) {
    setPageNumber(pageNumber);
  }

  function handlePageLoadSuccess(page: PDFPageProxy) {
    console.debug("loaded page", page);
    console.debug("page number", page.pageNumber);

    // Update the last visited page
    setLastVisitedPageNumber(page.pageNumber);
  }

  function handleClickOutlineEntry(entry: PdfOutlineEntry) {
    // Get the page number
    const pageNumber = entry.pageNumber;

    if (pageNumber === null) return;

    console.debug("navigating to page", pageNumber);

    // Update the page number
    setPageNumber(pageNumber);
  }

  useEffect(() => {}, []);

  return (
    <div className={cn("h-full w-full overflow-clip rounded-md", className)}>
      {/* Top bar */}
      <div className="flex items-center justify-center gap-2 p-2">
        {/* Back to the last visited page */}
        <Button
          onClick={() => {
            if (lastVisitedPageNumber === null) return;

            console.debug(
              "navigating to last visited page",
              lastVisitedPageNumber,
            );

            setPageNumber(lastVisitedPageNumber);
          }}
          disabled={lastVisitedPageNumber === null}
        >
          Back
        </Button>

        <Button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </Button>

        <p>
          Page {pageNumber} of {numPages}
        </p>

        <Button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === numPages}
        >
          Next
        </Button>
      </div>

      <PdfOutline
        entries={outlineEntries}
        onClickEntry={handleClickOutlineEntry}
      ></PdfOutline>

      <Document
        className="flex w-full flex-row"
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        onItemClick={handleItemClick}
      >
        {/* <Outline
          className={cn(
            "flex h-screen w-[60rem] flex-col gap-2 overflow-y-auto text-wrap font-semibold text-muted-foreground [&_li]:hover:text-foreground",
            "[&>ul>li>ul>li]:translate-x-2 [&>ul>li>ul>li]:text-sm",
          )}
        /> */}

        <Page pageNumber={pageNumber} onLoadSuccess={handlePageLoadSuccess} />
      </Document>
    </div>
  );
}
