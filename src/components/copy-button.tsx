"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, src, ...props }, ref) => {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
      if (hasCopied) {
        const timeout = setTimeout(() => setHasCopied(false), 2000);
        return () => clearTimeout(timeout);
      }
    }, [hasCopied]);

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("relative h-8 w-8 text-muted-foreground", className)}
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setHasCopied(true);
        }}
        {...props}
      >
        <span className="sr-only">
          Copy {src ? `${src} to clipboard` : "to clipboard"}
        </span>
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    );
  }
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
