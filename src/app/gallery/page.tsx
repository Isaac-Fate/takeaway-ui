import { CameraDemo } from "./components/camera-demo";

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of reusable components built with Radix UI and Tailwind
          CSS.
        </p>
      </div>
      <div className="space-y-10">
        <section id="camera">
          <CameraDemo />
        </section>
      </div>
    </div>
  );
}
