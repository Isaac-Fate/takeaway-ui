"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFViewer } from "@/components/pdf-viewer";

// PDF from GitHub raw file
const examplePdfUrl =
  "https://raw.githubusercontent.com/Isaac-Fate/mathematical-analysis/master/tex/mathematical-analysis.pdf";

export default function PDFViewerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          PDF Viewer
        </h1>
        <p className="text-lg text-muted-foreground">
          A PDF viewer component with text selection, link clicking, zoom, and
          page navigation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample PDF</CardTitle>
        </CardHeader>
        <CardContent className="h-[800px]">
          <PDFViewer src={examplePdfUrl} className="h-full" />
        </CardContent>
      </Card>
    </div>
  );
}
