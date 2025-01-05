"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";

// Core languages
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// Common languages
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-zig";

// Config & Tools
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-ini";

interface CodeBlockContentProps extends React.HTMLAttributes<HTMLElement> {
  content: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlockContent = React.forwardRef<
  HTMLElement,
  CodeBlockContentProps
>(({ className, content, language, showLineNumbers, ...props }, ref) => {
  const highlighted = React.useMemo(() => {
    if (!language) return content;

    try {
      const code = Prism.highlight(
        content,
        Prism.languages[language],
        language,
      );

      const lines = code.split("\n");
      const numberedLines = lines
        .map((line, i) => {
          let lineNumber: number | null = null;

          if (showLineNumbers) {
            lineNumber = i + 1;
          }

          return `<div class="code-line"><span class="code-line-number" aria-hidden="true">${
            lineNumber ? lineNumber : ""
          }</span><div class="code-line-content">${line ?? ""}</div></div>`;
        })
        .join("\n");

      return numberedLines;
    } catch {
      return content;
    }
  }, [content, language, showLineNumbers]);

  return (
    <code
      suppressHydrationWarning
      ref={ref}
      className={cn(
        "!m-0 !flex !flex-col !gap-1 !bg-transparent !p-0 !text-xs !leading-normal",
        "[&_.code-line]:flex [&_.code-line]:flex-row [&_.code-line]:items-center [&_.code-line]:gap-2",

        // Make the backgound of each span transparent
        // for I noticed that some highlighted spans have a background color
        "[&_.code-line-content_span]:!bg-transparent",
        language && `language-${language}`,
        showLineNumbers &&
          "[&_.code-line-number]:!w-4 [&_.code-line-number]:!select-none [&_.code-line-number]:text-end [&_.code-line-number]:!text-muted-foreground",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: highlighted }}
      {...props}
    />
  );
});

CodeBlockContent.displayName = "CodeBlockContent";
