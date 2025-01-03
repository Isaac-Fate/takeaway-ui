import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-full items-center gap-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Takeaway UI
      </h1>
      <p className="text-lg text-muted-foreground max-w-[600px]">
        A collection of beautiful and reusable UI components built with Tailwind
        CSS and shadcn/ui.
      </p>
      <div className="flex gap-4">
        <Link href="/gallery">
          <Button size="lg">View Components</Button>
        </Link>
        <Link href="https://github.com/shadcn-ui/ui" target="_blank">
          <Button variant="outline" size="lg">
            GitHub
          </Button>
        </Link>
      </div>
    </main>
  );
}
