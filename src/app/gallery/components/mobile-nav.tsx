"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  components: readonly {
    name: string;
    href: string;
  }[];
}

export function MobileNav({ components }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
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
    </Sheet>
  );
}
