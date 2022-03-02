import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { copyCrudAtom, copyBaseAtom } from "./helpers";
import { logger } from "../../src/utils";

export const makeAtom = async (name: string, crud = false) => {
  const src = path.join(process.cwd(), crud ? "bin/atom/crud" : "bin/atom/base");
  const dest = path.join(process.cwd(), "src/atoms", `${name}s`);

  if (crud) {
    await copyCrudAtom(name, src, dest);
  } else {
    copyBaseAtom(name, src, dest);
  }
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

  logger.info(user.username);
};
