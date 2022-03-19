import inquirer from 'inquirer';
import { PrismaClient } from '@prisma/client';

export const rootUser = (prisma: PrismaClient) => {
  return inquirer.prompt([
    // Username
    {
      name: 'username',
      type: 'input',
      message: 'Username',
      validate: async (value: string) => {
        if (await prisma.user.findUnique({ where: { username: value } })) {
          return 'User with this username already exists.';
        }

        return true;
      },
    },

    // Password
    {
      name: 'password',
      type: 'password',
      message: 'Password',
      validate: (value: string) => {
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters');
        } else if (value.length > 40) {
          throw new Error('Password must be at most 40 characters');
        }

        return true;
      },
    },
  ]);
};

export const projectInfo = () => {
  return inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Project Name:',
    },
    {
      name: 'version',
      type: 'input',
      message: 'Version:',
    },
    {
      name: 'description',
      type: 'input',
      message: 'Description:',
    },
    {
      name: 'author',
      type: 'input',
      message: 'Author:',
    },
  ]);
};

export const atomField = () => {
  return inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Field name',
    },
    {
      name: 'type',
      type: 'list',
      choices: ['String', 'Int', 'Float', 'DateTime'],
      message: 'Field name',
    },
  ]);
};

export const addAnotherField = () => {
  return inquirer.prompt({
    name: 'more',
    type: 'confirm',
    message: 'Do you want to define more fields',
  });
};
