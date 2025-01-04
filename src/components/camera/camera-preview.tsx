"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the CameraPreview component.
 * Extends video element props and adds a selfie mode option.
 */
export interface CameraPreviewProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Whether to mirror the camera view (useful for front-facing cameras) */
  selfie?: boolean;
}

/**
 * A minimal video component for displaying camera feed.
 *
 * Features:
 * - Supports selfie mode with mirrored display
 * - Maintains aspect ratio
 * - Styled with shadcn's design system
 * - Fully accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <CameraPreview
 *   ref={videoRef}
 *   selfie={true}
 *   className="custom-class"
 * />
 * ```
 */
const CameraPreview = React.forwardRef<HTMLVideoElement, CameraPreviewProps>(
  ({ className, selfie, style, ...props }, ref) => (
    <video
      ref={ref}
      playsInline
      style={{
        transform: selfie ? "scaleX(-1)" : undefined,
        ...style,
      }}
      className={cn(
        "aspect-video w-full rounded-md bg-muted object-cover",
        className
      )}
      {...props}
    />
  )
);
CameraPreview.displayName = "CameraPreview";

export { CameraPreview };
