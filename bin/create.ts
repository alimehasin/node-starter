/* eslint-disable no-console */
import fs from "fs";
import { Command } from "commander";

const program = new Command();

program
  .command("atom")
  .argument("<name>", "section name")
  .action(async (name) => {
    const dir = `src/${name}`;

    // Create the folder
    fs.mkdirSync(dir);

    // Copy files
    fs.copyFileSync("bin/files/router.ts", `${dir}/router.ts`);
    fs.copyFileSync("bin/files/controller.ts", `${dir}/controller.ts`);
    fs.copyFileSync("bin/files/validator.ts", `${dir}/validator.ts`);
    fs.copyFileSync("bin/files/service.ts", `${dir}/service.ts`);
    fs.copyFileSync("bin/files/index.ts", `${dir}/index.ts`);
  });

program.parse(process.argv);
