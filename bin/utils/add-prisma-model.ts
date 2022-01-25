import path from "path";
import _ from "lodash";
import fse from "fs-extra";

export default async function addPrismaSchema(name: string, fields: any[]) {
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
