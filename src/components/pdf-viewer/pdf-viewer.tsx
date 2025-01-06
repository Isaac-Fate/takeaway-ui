"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import * as pdfjsLib from "pdfjs-dist";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer.mjs";
import "@/styles/text_layer_builder.css";

// Set the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
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

    // Get the page
    const page = await pdf.getPage(pageNumber);

    // Get the viewport of the page
    const viewport = page.getViewport({ scale: 1.5 });

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

    console.debug("textContent", textContent);

    // Create the text layer instance
    const textLayer = new pdfjsLib.TextLayer({
      textContentSource: textContent,
      container: textLayerRef.current,
      viewport: viewport,
    });

    // Render the text layer
    await textLayer.render();
  }

  useEffect(() => {
    loadPdf();
  }, []);

  useEffect(() => {
    if (pdf === undefined) return;

    renderPage(pdf, 50);
  }, [pdf]);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-clip rounded-md border-2",
        className,
      )}
    >
      <canvas ref={canvasRef} className="border-2"></canvas>

      <div ref={textLayerRef} className="textLayer !z-50"></div>

      <div ref={annotationLayerRef} className="annotationLayer"></div>
    </div>
  );
}
