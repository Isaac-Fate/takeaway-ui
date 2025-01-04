import { join } from "path";
import type { Component } from "../types";

const COMPONENTS_DIR = join(__dirname, "../../components");

export function getComponents(): Component[] {
  return [
    {
      name: "button",
      description: "A clickable button component",
      dependencies: ["@radix-ui/react-slot"],
      files: ["components/ui/button.tsx"],
    },
    {
      name: "card",
      description: "Container for content",
      files: ["components/ui/card.tsx"],
    },
  ];
}
