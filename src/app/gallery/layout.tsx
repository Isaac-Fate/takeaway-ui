import { cn } from "@/lib/utils";
import Link from "next/link";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const components = [
  {
    name: "Camera",
    href: "#camera",
  },
] as const;

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <SheetContent side="left" className="w-72 md:hidden">
        <SheetHeader>
          <SheetTitle>Components</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-1">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                "transition-colors"
              )}
            >
              {component.name}
            </Link>
          ))}
        </div>
      </SheetContent>

      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <div className="space-y-4">
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold">Components</h2>
              <div className="space-y-1">
                {components.map((component) => (
                  <Link
                    key={component.href}
                    href={component.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                      "transition-colors"
                    )}
                  >
                    {component.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative p-6 lg:gap-10 lg:p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
