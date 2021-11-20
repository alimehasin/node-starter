/* eslint-disable no-console */
import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { fields } from "../src/atoms/users/validator";

const program = new Command();
const prisma = new PrismaClient();

program
  .command("atom")
  .argument("<name>", "section name")
  .action(async (name) => {
    const dir = `src/atoms/${name}`;

    // Create the folder
    fs.mkdirSync(dir);

    // Copy files
    fs.copyFileSync("bin/files/router.ts", `${dir}/router.ts`);
    fs.copyFileSync("bin/files/controller.ts", `${dir}/controller.ts`);
    fs.copyFileSync("bin/files/validator.ts", `${dir}/validator.ts`);
    fs.copyFileSync("bin/files/service.ts", `${dir}/service.ts`);
    fs.copyFileSync("bin/files/index.ts", `${dir}/index.ts`);
  });

program.command("root-user").action(async () => {
  const answers = await inquirer.prompt([
    // Username
    {
      name: "username",
      type: "input",
      message: "Username",
      validate: async (value: string) => {
        const username = fields.username.parse(value);

        if (await prisma.user.findUnique({ where: { username } })) {
          return "User with this username already exists.";
        }

        return true;
      },
    },

    // Password
    {
      name: "password",
      type: "password",
      message: "Password",
      validate: (value: string) => {
        fields.password.parse(value);
        return true;
      },
    },
  ]);

  const user = await prisma.user.create({
    data: {
      username: answers.username,
      password: await bcrypt.hash(answers.password, 14),
    },
  });

  // eslint-disable-next-line no-console
  console.log(user.username);

  // Disconnect prisma
  await prisma.$disconnect();
});

program.parse(process.argv);
