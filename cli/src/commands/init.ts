import inquirer from "inquirer";
import { writeFileSync } from "fs";
import { join } from "path";
import type { Config } from "../types";

export const initCommand = async (): Promise<void> => {
  const { componentsDir, style } = await inquirer.prompt([
    {
      type: "input",
      name: "componentsDir",
      message: "Where would you like to install the components?",
      default: "components/ui",
    },
    {
      type: "list",
      name: "style",
      message: "Which styling solution would you like to use?",
      choices: [
        { name: "Default", value: "default" },
        { name: "Tailwind CSS", value: "tailwind" },
      ],
    },
  ]);

  const config: Config = {
    components: componentsDir,
    style,
  };

  writeFileSync(
    join(process.cwd(), "components.json"),
    JSON.stringify(config, null, 2),
  );

  console.log("Configuration file created");
};
