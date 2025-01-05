"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LogoIcon } from "./logo-icon";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <LogoIcon
          className={cn(
            "transition-colors duration-75",
            theme === "dark" ? "stroke-white" : "stroke-black",
          )}
        />
      </div>
    );
  },
);

Logo.displayName = "Logo";
