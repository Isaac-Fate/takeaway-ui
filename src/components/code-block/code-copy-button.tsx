"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { ButtonProps } from "@/components/ui/button";

interface CodeCopyButtonProps extends ButtonProps {
  value: string;
}

export const CodeCopyButton = React.forwardRef<
  HTMLButtonElement,
  CodeCopyButtonProps
>(({ value, className, ...props }, ref) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={className}
      {...props}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
    </Button>
  );
});

CodeCopyButton.displayName = "CodeCopyButton";
