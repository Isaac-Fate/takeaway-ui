"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";

export function Header() {
  const pathname = usePathname();
  const showMenuButton = pathname.startsWith("/gallery");

  return (
    <header className="z-50 flex-row w-full border-b bg-background flex h-14 items-center justify-between px-8">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        )}
        <Link href="/" className="font-semibold">
          Takeaway UI
        </Link>
      </div>

      <ThemeToggle />
    </header>
  );
}
