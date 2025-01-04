"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import { useTheme } from "next-themes";

// @ts-expect-error: react-syntax-highlighter is not typed
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-expect-error: react-syntax-highlighter is not typed
import { a11y, a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Position {
  line: number;
  column: number;
  offset?: number;
}

interface NodePosition {
  start: Position;
  end: Position;
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  node?: {
    position?: NodePosition;
  };
}

export function CodeBlock({
  children = "",
  className,
  node,
  ...props
}: CodeBlockProps) {
  const { theme } = useTheme();
  const codeContent = String(children).replace(/\n$/, "");
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  // Check if code is inline by comparing start and end line numbers
  const isInline = node?.position?.start.line === node?.position?.end.line;

  // Handle inline code or code without language
  if (isInline) {
    return (
      <code
        className={cn("bg-muted px-1.5 py-0.5 rounded-sm", className)}
        {...props}
      >
        {children}
      </code>
    );
  }

  // Code block with syntax highlighting
  const codeStyle = theme === "light" ? a11y : a11yDark;

  return (
    <div className="relative my-4 rounded-lg border bg-muted">
      <div className="flex h-11 items-center justify-between border-b bg-muted px-4">
        <div className="text-xs text-muted-foreground">{language}</div>
        <CopyButton value={codeContent} src={language} />
      </div>
      <div className="overflow-x-auto p-4">
        <SyntaxHighlighter
          PreTag="div"
          language={language}
          style={codeStyle}
          customStyle={{
            backgroundColor: "transparent",
            margin: 0,
            padding: 0,
          }}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
