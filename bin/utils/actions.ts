import fs from "fs";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const makeEmptyAtom = (name: string) => {
  const dir = `src/atoms/${name}`;

  // Create the folder
  fs.mkdirSync(dir);

  // Copy files
  fs.copyFileSync("bin/files/router.ts", `${dir}/router.ts`);
  fs.copyFileSync("bin/files/controller.ts", `${dir}/controller.ts`);
  fs.copyFileSync("bin/files/validator.ts", `${dir}/validator.ts`);
  fs.copyFileSync("bin/files/service.ts", `${dir}/service.ts`);
  fs.copyFileSync("bin/files/index.ts", `${dir}/index.ts`);
};

export const createRootUser = async (
  prisma: PrismaClient,
  { username, password }: { username: string; password: string }
) => {
  const user = await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 14),
    },
  });

  // eslint-disable-next-line no-console
  console.log(user.username);
};
