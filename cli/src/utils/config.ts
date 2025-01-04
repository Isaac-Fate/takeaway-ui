import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { Config } from "../types";

export function getConfig(): Config | null {
  const configPath = join(process.cwd(), "components.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(configPath, "utf-8"));
  } catch {
    return null;
  }
}
