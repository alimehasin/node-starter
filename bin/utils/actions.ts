import fse from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const makeEmptyAtom = async (name: string) => {
  const src = path.join(process.cwd(), "bin/atom/base");
  const dest = path.join(process.cwd(), "src/atoms", name);

  await fse.copy(src, dest);
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
