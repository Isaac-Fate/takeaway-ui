"use client";

import { CameraView, useCamera } from "@/components/camera";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CameraDemo() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3);

  const {
    ref,
    stream,
    facingMode,
    isCountingDown,
    countdownValue,
    startCamera,
    stopCamera,
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
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Camera</h2>
        <p className="text-sm text-muted-foreground">
          A minimal camera component with capture functionality.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Camera Preview</CardTitle>
          <CardDescription>
            {stream ? "Camera is active" : "Camera is inactive"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative overflow-hidden rounded-md bg-muted">
            <CameraView
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
                  className={cn(
                    "px-3",
                    countdownSeconds === seconds && "bg-accent"
                  )}
                >
                  {seconds}s
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {!stream ? (
              <Button onClick={startCamera} size="sm">
                Start camera
              </Button>
            ) : (
              <>
                <Button
                  onClick={captureImage}
                  size="sm"
                  disabled={isCountingDown}
                >
                  Capture
                </Button>
                <Button
                  onClick={() => captureWithCountdown(countdownSeconds)}
                  size="sm"
                  disabled={isCountingDown}
                >
                  {isCountingDown
                    ? `Capturing in ${countdownValue}...`
                    : "Capture with Countdown"}
                </Button>
                <Button
                  onClick={switchCamera}
                  variant="outline"
                  size="sm"
                  disabled={isCountingDown}
                >
                  {facingMode === "user" ? "Rear camera" : "Front camera"}
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="sm"
                  disabled={isCountingDown}
                >
                  Stop
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Captured Photo</DialogTitle>
            <DialogDescription>
              Your photo has been captured. You can download it or take another
              one.
            </DialogDescription>
          </DialogHeader>
          {photo && (
            <div className="aspect-video relative overflow-hidden rounded-md">
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
              Take another
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
