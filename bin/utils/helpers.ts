import path from 'path';
import _ from 'lodash';
import fse from 'fs-extra';
import { atomField, addAnotherField } from './inquiries';

export const getAtomFields = async () => {
  const fields = [];

  while (true) {
    const field = await atomField();
    fields.push(field);
    const keep = await addAnotherField();

    if (!keep.more) {
      break;
    }
  }

  return fields;
};

export const addPrismaModel = async (name: string, fields: any[]) => {
  let model = `
model ${_.capitalize(name)} {
  id String @id @default(uuid())
`;

  fields.forEach((field) => {
    model += `  ${field.name} ${field.type}\n`;
  });

  model += '}';

  await fse.appendFile(path.join(process.cwd(), 'src/prisma/schema.prisma'), model, {
    encoding: 'utf-8',
  });
};

export const copySchemas = async (src: string, dest: string, fields: any[]) => {
  let content = await fse.readFile(path.join(src, 'schemas.ts'), { encoding: 'utf-8' });

  let schemas = '';

  fields.forEach((field) => {
    if (field.type === 'String') {
      schemas += `  ${field.name}: z.string(),\n`;
    } else if (field.type === 'Int' || field.type === 'Float') {
      schemas += `  ${field.name}: z.number(),\n`;
    } else if (field.type === 'DateTime') {
      schemas += `  ${field.name}: z.string().refine(Date),\n`;
    }
  });

  schemas = schemas.slice(0, -1);
  content = content.replace('//_0', schemas);
  await fse.writeFile(path.join(dest, 'schemas.ts'), content, { encoding: 'utf-8' });
};

export const copyCrudAtom = async (name: string, src: string, dest: string) => {
  // Get atom fields
  const fields = await getAtomFields();

  // List of promises
  const promises: Promise<void>[] = [
    addPrismaModel(name, fields),
    copySchemas(src, dest, fields),
  ];

  // Exact copy
  const exactCopy = ['index.ts', 'middlewares.ts', 'router.ts'];
  exactCopy.map(async (file) => {
    promises.push(fse.copy(path.join(src, file), path.join(dest, file)));
  });

  // Inexact copy
  const inexactCopy = ['controllers.ts', 'services.ts'];
  inexactCopy.map(async (file) => {
    const general = await fse.readFile(path.join(src, file), {
      encoding: 'utf-8',
    });

    const modified = general.replace(/object/g, name);
    promises.push(fse.writeFile(path.join(dest, file), modified));
  });

  await Promise.all(promises);
};

export const copyBaseAtom = async (name: string, src: string, dest: string) => {
  await fse.copy(src, dest);
};

export const addAtomRoute = (name: string) => {
  const atomName = `${name}s`;
  const imp = `import ${atomName} from './${atomName}';\n\nc`;
  const use = `router.use('/${atomName}', ${atomName});\n\ne`;
  const routerFilePath = path.join(process.cwd(), '/src/atoms/router.ts');

  let file = fse.readFileSync(routerFilePath, { encoding: 'utf-8' });

  file = file.replace(/\nc/, imp);
  file = file.replace(/\ne/, use);

  fse.writeFileSync(routerFilePath, file);
};
