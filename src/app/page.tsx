import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-12 w-12" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Takeaway UI
        </h1>
      </div>
      <p className="max-w-[600px] text-lg text-muted-foreground">
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
