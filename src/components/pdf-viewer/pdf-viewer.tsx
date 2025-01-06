"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { pdfjs, Document, Page } from "react-pdf";

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleItemClick({ pageNumber }: { pageNumber: number }) {
    setPageNumber(pageNumber);
  }

  useEffect(() => {}, []);

  return (
    <div
      className={cn(
        "h-full w-full overflow-clip rounded-md border-2",
        className,
      )}
    >
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        onItemClick={handleItemClick}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
