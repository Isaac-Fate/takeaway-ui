"use client";

import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// @ts-expect-error: react-syntax-highlighter is not typed
import SyntaxHighlighter from "react-syntax-highlighter";

import {
  a11yLight,
  a11yDark,

  // @ts-expect-error: react-syntax-highlighter is not typed
} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Position {
  line: number;
  column: number;
  offset?: number;
}

interface NodePosition {
  start: Position;
  end: Position;
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  node?: {
    position?: NodePosition;
  };
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children = "",
  className,
  node,
  showLineNumbers,
  ...props
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();

  console.log(a11yLight);
  console.log(a11yDark);

  // Code content
  const codeContent = String(children);

  // Get the programming language from the class name
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  // Check if code is inline by comparing start and end line numbers
  const isInline = node?.position?.start.line === node?.position?.end.line;

  // Code block with syntax highlighting
  const codeStyle = resolvedTheme === "light" ? a11yLight : a11yDark;

  React.useEffect(() => {
    console.log(codeStyle);
  }, [resolvedTheme]);

  // Handle inline code or code without language
  if (isInline) {
    return (
      <code
        className={cn("rounded-sm bg-muted px-1.5 py-0.5", className)}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted px-4">
        <div className="text-xs text-muted-foreground">{language}</div>
        <CopyButton value={codeContent} src={language} />
      </CardHeader>

      <CardContent className="overflow-x-auto p-4">
        <SyntaxHighlighter
          PreTag="pre"
          language={language}
          style={codeStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{
            backgroundColor: "transparent",
            margin: 0,
            padding: 0,
          }}
        >
          {codeContent}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}
