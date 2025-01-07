import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/types/src/pdf";
import type { RefProxy } from "pdfjs-dist/types/src/display/api.js";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { z } from "zod";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

export interface PdfOutlineEntry {
  title: string;
  level: number;
  pageNumber: number | null;
  children: PdfOutlineEntry[];
}

const PdfOutlineEntrySchema: z.ZodSchema<PdfOutlineEntry> = z.lazy(() =>
  z.object({
    title: z.string(),
    level: z.number().int().gte(1),
    pageNumber: z.number().positive().nullable(),
    children: z.array(PdfOutlineEntrySchema),
  }),
);

interface PdfjsOutlineEntry {
  title: string;
  bold: boolean;
  italic: boolean;

  /**
   * - The color in RGB format to use for
   * display purposes.
   */
  color: Uint8ClampedArray;
  dest: string | Array<any> | null;
  url: string | null;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: Array<PdfjsOutlineEntry>;
}

interface PdfOutlineProps {
  className?: string;
  entries?: PdfOutlineEntry[];
  onClickEntry?: (entry: PdfOutlineEntry) => void;
}

export function PdfOutline(props: PdfOutlineProps) {
  if (!props.entries) {
    return null;
  }

  return (
    <Accordion
      className={cn("w-[20rem]", props.className)}
      type="single"
      collapsible
    >
      {props.entries.map((entry, index) => (
        <PdfOutlineEntryView
          key={index}
          entry={entry}
          onClick={props.onClickEntry}
        />
      ))}
    </Accordion>
  );
}

interface PdfOutlineEntryProps {
  className?: string;
  entry: PdfOutlineEntry;
  onClick?: (entry: PdfOutlineEntry) => void;
}

export function PdfOutlineEntryView(props: PdfOutlineEntryProps): JSX.Element {
  if (props.entry.children.length === 0) {
    return (
      <Button
        className={cn(
          "flex w-full items-center justify-start gap-2 rounded-md p-2 text-[15px] font-semibold leading-6 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground hover:no-underline [&>svg]:-order-1",
        )}
        variant="ghost"
        onClick={() => {
          props.onClick?.(props.entry);
        }}
      >
        {props.entry.title}
      </Button>
    );
  }

  return (
    <AccordionItem className="border-0" value={props.entry.title}>
      <AccordionTrigger
        className={cn(
          "items-center justify-start gap-2 rounded-md p-2 text-[15px] font-semibold leading-6 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground hover:no-underline [&>svg]:-order-1",
        )}
        onClick={() => {
          props.onClick?.(props.entry);
        }}
      >
        {props.entry.title}
      </AccordionTrigger>

      {/* Child entries */}
      <AccordionContent className="pl-6">
        <Accordion type="single" collapsible>
          {props.entry.children.map((entry, index) => (
            <PdfOutlineEntryView
              key={index}
              entry={entry}
              onClick={props.onClick}
            />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

export async function getPdfOutlineEntires(document: PDFDocumentProxy) {
  const pdfjsOutlineEntries =
    (await document.getOutline()) as PdfjsOutlineEntry[];

  return getPdfOutlineEntiresFromPdfjsEntries(document, pdfjsOutlineEntries);
}

async function getPdfOutlineEntiresFromPdfjsEntries(
  document: PDFDocumentProxy,
  entries: PdfjsOutlineEntry[],
  level: number = 1,
) {
  const pdfOutlineEntries: PdfOutlineEntry[] = [];

  for (const entry of entries) {
    const title = entry.title;

    let destinationId: string | null;
    if (typeof entry.dest === "string") {
      destinationId = entry.dest;
    } else if (Array.isArray(entry.dest) && entry.dest.length > 0) {
      destinationId = entry.dest[0];
    } else {
      destinationId = null;
    }

    if (destinationId === null) {
      pdfOutlineEntries.push(
        PdfOutlineEntrySchema.parse({
          title,
          level,
          pageNumber: null,
          children: await getPdfOutlineEntiresFromPdfjsEntries(
            document,
            entry.items,
            level + 1,
          ),
        }),
      );

      continue;
    }

    // Get the destination
    const destination = await document.getDestination(destinationId);

    console.debug(destination);

    let pageNumber: number | null;
    if (Array.isArray(destination) && destination.length > 0) {
      // Cast the first item of the array to RefProxy
      const refProxy = destination[0] as RefProxy;

      // Get the page number
      const pageIndex = await document.getPageIndex(refProxy);

      pageNumber = pageIndex + 1;
    } else {
      pageNumber = null;
    }

    pdfOutlineEntries.push(
      PdfOutlineEntrySchema.parse({
        title,
        level,
        pageNumber,
        children: await getPdfOutlineEntiresFromPdfjsEntries(
          document,
          entry.items,
          level + 1,
        ),
      }),
    );
  }

  return pdfOutlineEntries;
}
