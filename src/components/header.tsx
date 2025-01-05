"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";
import { LogoIcon } from "./logo";

export function Header() {
  const pathname = usePathname();
  const showMenuButton = pathname.startsWith("/gallery");

  return (
    <header className="z-50 flex h-14 w-full flex-row items-center justify-between border-b bg-background px-8">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        )}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LogoIcon className="size-6" />
          Takeaway UI
        </Link>
      </div>

      <ThemeToggle />
    </header>
  );
}
