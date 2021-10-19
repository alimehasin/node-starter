import { Command } from "commander";
import inquirer from "inquirer";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { fields } from "../src/users/validator";

const program = new Command();
const prisma = new PrismaClient();

// Create root user command
program.command("cru").action(async () => {
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
