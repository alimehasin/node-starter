import path from "path";
import fse from "fs-extra";

export default async function copySchemas(src: string, dest: string, fields: any[]) {
  let content = await fse.readFile(path.join(src, "schemas.ts"), { encoding: "utf-8" });

  let schemas = "";

  fields.forEach((field) => {
    if (field.type === "String") {
      schemas += `  ${field.name}: z.string(),\n`;
    } else if (field.type === "Int" || field.type === "Float") {
      schemas += `  ${field.name}: z.number(),\n`;
    } else if (field.type === "DateTime") {
      schemas += `  ${field.name}: z.date(),\n`;
    }
  });

  schemas = schemas.slice(0, -1);
  content = content.replace("//_0", schemas);
  await fse.writeFile(path.join(dest, "schemas.ts"), content, { encoding: "utf-8" });
}
