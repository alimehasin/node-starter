import path from "path";
import _ from "lodash";
import fse from "fs-extra";
import { anotherField, getFieldInfo } from "./questions";

export default async function addPrismaSchema(name: string) {
  const fields = [];

  while (true) {
    const field = await getFieldInfo();
    fields.push(field);
    const keep = await anotherField();

    if (!keep.more) {
      break;
    }
  }

  let model = `
model ${_.capitalize(name)} {
  id String @id @default(uuid())
`;

  fields.forEach((field) => {
    model += `  ${field.name} ${field.type}\n`;
  });

  model += "}";

  await fse.appendFile(path.join(process.cwd(), "src/prisma/schema.prisma"), model, {
    encoding: "utf-8",
  });
}
