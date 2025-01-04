import { Command } from "commander";
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

program.parse();
