"use client";

import { CameraPreview, useCamera } from "@/components/camera";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CameraPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3);

  const {
    ref,
    stream,
    facingMode,
    isCountingDown,
    countdownValue,
    openCamera,
    closeCamera,
    switchCamera,
    captureImage,
    captureWithCountdown,
  } = useCamera({
    onCapture: (image) => {
      setPhoto(image);
      setShowPreview(true);
    },
    selfie: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Camera
        </h1>
        <p className="text-lg text-muted-foreground">
          Take photos using your device camera with features like countdown
          timer and camera switching.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          <CameraPreview
            ref={ref}
            className={cn(!stream && "invisible")}
            selfie={facingMode === "user"}
          />
          {isCountingDown && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-6xl font-bold text-white">
                {countdownValue}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              max={10}
              value={countdownSeconds}
              onChange={(e) => setCountdownSeconds(Number(e.target.value))}
              className="w-20"
              disabled={isCountingDown || !stream}
            />
            <span className="text-sm text-muted-foreground">seconds</span>
          </div>
          <div className="flex gap-2">
            {[3, 5, 10].map((seconds) => (
              <Button
                key={seconds}
                variant="outline"
                size="sm"
                onClick={() => setCountdownSeconds(seconds)}
                disabled={isCountingDown || !stream}
                className={cn(countdownSeconds === seconds && "bg-accent")}
              >
                {seconds}s
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {!stream ? (
            <Button onClick={openCamera}>Open Camera</Button>
          ) : (
            <>
              <Button onClick={captureImage} disabled={isCountingDown}>
                Take Photo
              </Button>
              <Button
                onClick={() => captureWithCountdown(countdownSeconds)}
                disabled={isCountingDown}
              >
                {isCountingDown
                  ? `Capturing in ${countdownValue}...`
                  : "Capture with Countdown"}
              </Button>
              <Button
                onClick={switchCamera}
                variant="outline"
                disabled={isCountingDown}
              >
                Switch Camera
              </Button>
              <Button
                onClick={closeCamera}
                variant="outline"
                disabled={isCountingDown}
              >
                Close Camera
              </Button>
            </>
          )}
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photo Preview</DialogTitle>
          </DialogHeader>
          {photo && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={photo}
                alt="Captured photo"
                fill
                className="object-cover"
              />
            </div>
          )}
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button
              onClick={() => {
                if (photo) {
                  const link = document.createElement("a");
                  link.href = photo;
                  link.download = "photo.jpg";
                  link.click();
                }
              }}
            >
              Download
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPhoto(null);
                setShowPreview(false);
              }}
            >
              Take Another
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
