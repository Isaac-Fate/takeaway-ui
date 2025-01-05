"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CodeBlock = React.forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ className, children, ...props }, ref) => {
  return (
    <pre
      ref={ref}
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg bg-muted px-4 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
