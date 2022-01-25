import path from "path";
import fse from "fs-extra";
import { anotherField, getFieldInfo } from "./questions";

export async function crud(name: string, src: string, dest: string) {
  const fields = [];

  while (true) {
    const field = await getFieldInfo();
    fields.push(field);
    const keep = await anotherField();

    if (!keep.more) {
      break;
    }
  }

  // TODO: Create Prisma model and update schemas

  // Exact copy
  const exactCopy = ["index.ts", "middlewares.ts", "router.ts", "schemas.ts"];
  const promises: Promise<void>[] = [];
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
