import { Card } from "@/components/ui/card";
import Link from "next/link";

const components = [
  {
    name: "Camera",
    description: "A minimal camera component with capture functionality.",
    href: "/gallery/camera",
  },
  {
    name: "Markdown",
    description:
      "A markdown display component with syntax highlighting and styling.",
    href: "/gallery/markdown",
  },
  {
    name: "Code Block",
    description:
      "A code block component with syntax highlighting and line numbers.",
    href: "/gallery/code-block",
  },
  {
    name: "PDF Viewer",
    description:
      "A PDF viewer component with zoom, scroll, and page navigation.",
    href: "/gallery/pdf-viewer",
  },
] as const;

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of reusable components built with Radix UI and Tailwind
          CSS.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link key={component.href} href={component.href}>
            <Card className="h-full p-6 hover:bg-muted/50">
              <h2 className="font-semibold">{component.name}</h2>
              <p className="text-sm text-muted-foreground">
                {component.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
