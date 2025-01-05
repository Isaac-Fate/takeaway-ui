import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const LogoIcon = React.forwardRef<SVGSVGElement, LogoIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 103"
        fill="none"
        stroke="currentColor"
        className={cn("", className)}
        {...props}
      >
        <path
          d="M2.81018 100.5L12.2241 20.1941H87.7759L97.1898 100.5H2.81018Z"
          stroke="currentColor"
          stroke-width="5"
        />
        <path
          d="M27.44 59.984L39.728 54.832L40.816 58.288L31.856 61.776L40.816 65.264L39.728 68.72L27.44 63.536V59.984ZM47.6 75.28H43.504L52.464 47.632H56.496L47.6 75.28ZM72.688 63.568L60.4 68.752L59.28 65.296L68.272 61.808L59.28 58.32L60.4 54.864L72.688 60.016V63.568Z"
          fill="currentColor"
        />
        <path
          d="M65 18.054C65 -3.15407 35 -0.848851 35 18.054"
          stroke="currentColor"
          stroke-width="5"
        />
      </svg>
    );
  },
);

LogoIcon.displayName = "LogoIcon";
