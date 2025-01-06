"use client";

import { PDFViewer } from "@/components/pdf-viewer";

const pdfUrl =
  "https://raw.githubusercontent.com/Isaac-Fate/mathematical-analysis/master/tex/mathematical-analysis.pdf";

export default function PDFViewerDemoPage() {
  return (
    <div>
      <PDFViewer src={pdfUrl}></PDFViewer>
    </div>
  );
}
