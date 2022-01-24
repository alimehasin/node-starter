import fs from "fs";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const makeEmptyAtom = (name: string) => {
  const dir = `src/atoms/${name}`;

  // Create the folder
  fs.mkdirSync(dir);

  // Copy files
  fs.copyFileSync("bin/atom-empty/router.ts", `${dir}/router.ts`);
  fs.copyFileSync("bin/atom-empty/controller.ts", `${dir}/controller.ts`);
  fs.copyFileSync("bin/atom-empty/schemas.ts", `${dir}/schemas.ts`);
  fs.copyFileSync("bin/atom-empty/service.ts", `${dir}/service.ts`);
  fs.copyFileSync("bin/atom-empty/index.ts", `${dir}/index.ts`);
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
