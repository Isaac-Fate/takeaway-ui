import { Command } from "commander";
import fs from "fs";
import { addCommand, initCommand } from "./commands";

const program = new Command();

program
  .name("takeaway-ui")
  .description("Add components to your project")
  .version("1.0.0");

program
  .command("add")
  .description("Add a component to your project")
  .action(addCommand);

program
  .command("init")
  .description("Initialize configuration")
  .action(initCommand);

program.command("debug").action(async () => {
  console.log("debug");

  const fileContent = await fetch(
    "https://raw.githubusercontent.com/Isaac-Fate/takeaway-ui/refs/heads/main/src/components/camera/camera-preview.tsx",
  );

  // Write the file
  fs.writeFileSync("components/camera-preview.tsx", await fileContent.text());
});

program.parse();
