"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

interface MarkdownDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export function MarkdownDisplay({
  content,
  className,
  ...props
}: MarkdownDisplayProps) {
  return (
    <div
      className={cn(
        "prose prose-stone dark:prose-invert max-w-none",
        "prose-headings:scroll-m-20 prose-headings:font-semibold",
        "prose-h1:text-3xl prose-h1:lg:text-4xl",
        "prose-h2:text-2xl prose-h2:lg:text-3xl",
        "prose-h3:text-xl prose-h3:lg:text-2xl",
        "prose-h4:text-lg prose-h4:lg:text-xl",
        "prose-p:leading-7",
        "prose-pre:p-0 prose-pre:bg-transparent",
        "prose-code:before:content-none prose-code:after:content-none",
        className
      )}
      {...props}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {children}
            </a>
          ),
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
