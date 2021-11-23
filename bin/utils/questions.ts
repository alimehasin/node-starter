import inquirer from "inquirer";
import { PrismaClient } from "@prisma/client";
import { fields } from "../../src/atoms/users/validator";

export const getRootUserInfo = (prisma: PrismaClient) => {
  return inquirer.prompt([
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
};

export const getProjectInfo = () => {
  return inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Project Name:",
    },
    {
      name: "version",
      type: "input",
      message: "Version:",
    },
    {
      name: "description",
      type: "input",
      message: "Description:",
    },
    {
      name: "author",
      type: "input",
      message: "Author:",
    },
  ]);
};
