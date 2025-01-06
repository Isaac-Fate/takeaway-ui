import { useEffect, useState } from "react";

import * as pdfjsLib from "pdfjs-dist";

export const usePDFJS = async (
  onLoad: (pdfjs: typeof pdfjsLib) => Promise<void>,
  deps: (string | number | boolean | undefined | null)[] = [],
) => {
  // const [pdfjs, setPDFJS] = useState<typeof pdfjsLib>();
  // // Load the library once on mount (the webpack import automatically sets-up the worker)
  // useEffect(() => {
  //   // @ts-ignore
  //   // import("pdfjs-dist/webpack.mjs").then(setPDFJS);
  // }, []);
  // // Execute the callback function whenever PDFJS loads (or a custom dependency-array updates)
  // useEffect(() => {
  //   if (!pdfjs) return;
  //   (async () => await onLoad(pdfjs))();
  // }, [pdfjs, ...deps]);
};
