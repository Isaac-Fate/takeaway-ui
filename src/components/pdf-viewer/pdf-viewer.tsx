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

      <div className="flex flex-row">
        <PdfOutline
          className="rounded-md border-2"
          entries={outlineEntries}
          onClickEntry={handleClickOutlineEntry}
        ></PdfOutline>

        <Document
          className="flex h-screen w-full flex-col overflow-y-auto"
          file={src}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={handleItemClick}
        >
          {/* <Page pageNumber={pageNumber} onLoadSuccess={handlePageLoadSuccess} /> */}
          {numPages &&
            Array.from({ length: numPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <Page
                  key={pageNumber}
                  pageNumber={pageNumber}
                  onLoadSuccess={handlePageLoadSuccess}
                />
              );
            })}
        </Document>
      </div>
    </div>
  );
}
