import inquirer from "inquirer";
import { getComponents } from "../utils/get-components";
import { getConfig } from "../utils/config";
import type { Component } from "../types";

export const addCommand = async (): Promise<void> => {
  const config = getConfig();
  if (!config) {
    console.error("No configuration found. Run `init` first");
    process.exit(1);
  }

  const components = getComponents();

  const { component } = await inquirer.prompt({
    type: "list",
    name: "component",
    message: "Which component would you like to add?",
    choices: components.map((comp) => ({
      name: `${comp.name} - ${comp.description}`,
      value: comp,
    })),
  });

  await installComponent(component, config);
};

async function installComponent(component: Component, config: Config) {
  // TODO: Implementation
  // 1. Copy files from COMPONENTS_DIR to config.components
  // 2. Install dependencies if needed
  console.log(`Added ${component.name} component`);
}
