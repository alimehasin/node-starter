import fse from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const makeAtom = async (name: string, crud = false) => {
  const src = path.join(process.cwd(), crud ? "bin/atom/crud" : "bin/atom/base");
  const dest = path.join(process.cwd(), "src/atoms", name);

  if (crud) {
    const exactCopy = ["index.ts", "middlewares.ts", "router.ts", "schemas.ts"];
    exactCopy.forEach(async (file) => {
      await fse.copy(path.join(src, file), path.join(dest, file));
    });

    // Copy controller.ts
    const generalController = await fse.readFile(path.join(src, "controller.ts"), {
      encoding: "utf-8",
    });

    const controller = generalController.replace(/object/g, name);
    await fse.writeFile(path.join(dest, "controller.ts"), controller);

    // Copy controller.ts
    const generalService = await fse.readFile(path.join(src, "service.ts"), {
      encoding: "utf-8",
    });

    const service = generalService.replace(/object/g, name);
    await fse.writeFile(path.join(dest, "service.ts"), service);
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
