"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css";
import "@/styles/pdf-viewer.css";

// Set the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.js",
  import.meta.url,
).toString();

interface PDFViewerProps {
  className?: string;
  src: string;
}

export function PDFViewer({ className, src }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const annotationLayerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy>();

  async function loadPdf() {
    const loadingTask = pdfjsLib.getDocument(src);
    const pdf = await loadingTask.promise;
    setPdf(pdf);
  }

  async function renderPage(
    pdf: pdfjsLib.PDFDocumentProxy,
    pageNumber: number,
  ) {
    if (
      !canvasRef.current ||
      !textLayerRef.current ||
      !annotationLayerRef.current
    )
      return;

    const outline = await pdf.getOutline();
    console.debug("outline", outline);

    // Get the page
    const page = await pdf.getPage(pageNumber);

    const destination = await pdf.getDestination("section.2.1");
    console.debug("destination", destination);

    // Get the viewport of the page
    const viewport = page.getViewport({ scale: 1 });

    // Get the canvas element
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the canvas context
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    // Set the canvas dimensions to match the PDF page size
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Create the render context
    const renderContext = {
      canvasContext,
      viewport,
    };

    // Render the page content
    await page.render(renderContext).promise;

    // Render the text layer
    const textContent = await page.getTextContent();
    pdfjsLib.renderTextLayer({
      textContentSource: textContent,
      container: textLayerRef.current,
      viewport: viewport,
      textDivs: [],
    });
  }

  useEffect(() => {
    loadPdf();
  }, []);

  useEffect(() => {
    if (pdf === undefined) return;

    renderPage(pdf, 50);
  }, [pdf]);

  return (
    <div className={cn("pdfViewer relative", className)}>
      <canvas ref={canvasRef} className="border-2"></canvas>

      <div ref={textLayerRef} className="textLayer [&_span]:!text-white"></div>

      <div ref={annotationLayerRef} className="annotationLayer"></div>
    </div>
  );
}
