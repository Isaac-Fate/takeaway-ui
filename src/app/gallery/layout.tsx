import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const components = [
  {
    name: "Camera",
    href: "/gallery/camera",
  },
  {
    name: "Markdown",
    href: "/gallery/markdown",
  },
  {
    name: "Code Block",
    href: "/gallery/code-block",
  },
  {
    name: "PDF Viewer",
    href: "/gallery/pdf-viewer",
  },
] as const;

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <div className="space-y-4">
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold">Components</h2>
              <div className="space-y-1">
                {components.map((component) => (
                  <Link key={component.href} href={component.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      {component.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative py-6 lg:gap-10 lg:py-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
