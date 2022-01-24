import fse from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const makeAtom = async (name: string, crud = false) => {
  const src = path.join(process.cwd(), crud ? "bin/atom/crud" : "bin/atom/base");
  const dest = path.join(process.cwd(), "src/atoms", `${name}s`);

  if (crud) {
    // Exact copy
    const exactCopy = ["index.ts", "middlewares.ts", "router.ts", "schemas.ts"];
    exactCopy.forEach(async (file) => {
      await fse.copy(path.join(src, file), path.join(dest, file));
    });

    // Inexact copy
    const inexactCopy = ["controller.ts", "service.ts"];
    inexactCopy.forEach(async (file) => {
      const general = await fse.readFile(path.join(src, file), {
        encoding: "utf-8",
      });

      const modified = general.replace(/object/g, name);
      await fse.writeFile(path.join(dest, file), modified);
    });
  } else {
    await fse.copy(src, dest);
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

  // eslint-disable-next-line no-console
  console.log(user.username);
};
