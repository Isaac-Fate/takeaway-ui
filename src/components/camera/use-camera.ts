import { useRef, useState, useEffect } from "react";

/**
 * Configuration options for the useCamera hook
 */
export interface UseCameraOptions {
  /** Callback function to handle captured images */
  onCapture?: (image: string) => void;
  /** Whether to start in selfie mode (front camera) */
  selfie?: boolean;
}

/**
 * A React hook for managing camera operations.
 *
 * Features:
 * - Camera stream management (start/stop)
 * - Camera switching (front/back)
 * - Image capture with optional countdown
 * - Selfie mode support
 * - Automatic cleanup
 *
 * @example
 * ```tsx
 * const {
 *   ref,
 *   stream,
 *   startCamera,
 *   captureImage,
 *   captureWithCountdown
 * } = useCamera({
 *   onCapture: (image) => console.log(image),
 *   selfie: true
 * });
 *
 * // Capture with 5 second countdown
 * captureWithCountdown(5);
 * ```
 */
export function useCamera({
  onCapture,
  selfie = false,
}: UseCameraOptions = {}) {
  // Refs for accessing the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // State management
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    selfie ? "user" : "environment"
  );
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(0);

  /**
   * Initializes the camera stream and sets up the video element
   */
  const startCamera = async () => {
    try {
      // Request camera access with specified facing mode
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      setStream(mediaStream);

      const video = videoRef.current;
      if (!video) {
        console.error("Video element not found");
        return;
      }

      // Connect the stream to the video element
      video.srcObject = mediaStream;

      // Start playback when the video is ready
      video.onloadeddata = () => {
        video.play();
      };
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  /**
   * Stops the camera stream and cleans up resources
   */
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  /**
   * Switches between front and back cameras
   */
  const switchCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  /**
   * Captures an image from the current video frame
   * Handles mirroring for selfie mode
   */
  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    // Create a canvas to capture the frame
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror the image if in selfie mode
    if (facingMode === "user") {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }

    // Draw the video frame and convert to base64
    ctx.drawImage(video, 0, 0);
    onCapture?.(canvas.toDataURL("image/jpeg"));
  };

  /**
   * Manages countdown state for delayed capture
   * @param seconds Number of seconds to countdown before capture
   */
  const startCountdown = (seconds: number) => {
    setIsCountingDown(true);
    setCountdownValue(seconds);
  };

  /**
   * Captures an image after a countdown
   * @param seconds Number of seconds to wait before capturing
   */
  const captureWithCountdown = (seconds: number = 3) => {
    startCountdown(seconds);
  };

  // Start camera when facing mode changes
  useEffect(() => {
    if (facingMode) {
      startCamera();
    }
  }, [facingMode]);

  // Cleanup camera resources on unmount or stream change
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stream]);

  // Handle countdown timer and capture
  useEffect(() => {
    if (!isCountingDown) return;

    // Capture when countdown reaches zero
    if (countdownValue === 0) {
      captureImage();
      setIsCountingDown(false);
      return;
    }

    // Decrement countdown every second
    const timer = setTimeout(() => {
      setCountdownValue((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCountingDown, countdownValue]);

  return {
    ref: videoRef,
    stream,
    facingMode,
    isCountingDown,
    countdownValue,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage,
    captureWithCountdown,
  };
}
