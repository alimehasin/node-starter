import path from "path";
import fse from "fs-extra";
import { getAtomFields } from "./questions";
import addPrismaModel from "./add-prisma-model";
import copySchemas from "./copy-schemas";

export async function crud(name: string, src: string, dest: string) {
  // Get atom fields
  const fields = await getAtomFields();

  // List of promises
  const promises: Promise<void>[] = [
    addPrismaModel(name, fields),
    copySchemas(src, dest, fields),
  ];

  // Exact copy
  const exactCopy = ["index.ts", "middlewares.ts", "router.ts"];
  exactCopy.map(async (file) => {
    promises.push(fse.copy(path.join(src, file), path.join(dest, file)));
  });

  // Inexact copy
  const inexactCopy = ["controller.ts", "service.ts"];
  inexactCopy.map(async (file) => {
    const general = await fse.readFile(path.join(src, file), {
      encoding: "utf-8",
    });

    const modified = general.replace(/object/g, name);
    promises.push(fse.writeFile(path.join(dest, file), modified));
  });

  await Promise.all(promises);
}

export async function base(name: string, src: string, dest: string) {
  await fse.copy(src, dest);
}
