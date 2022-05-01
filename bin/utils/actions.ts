import _ from 'lodash';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { copyCrudAtom, copyBaseAtom, addAtomRoute } from './helpers';
import { AtomName } from './types';
import { logger } from '../../src/utils';

export const makeAtom = async (_name: string, crud = false) => {
  const name: AtomName = {
    kebabCase: _.kebabCase(_name),
    camelCase: _.camelCase(_name),
    pascalCase: _.startCase(_name).replace(/ /g, ''),
  };

  const src = path.join(process.cwd(), crud ? 'bin/atom/crud' : 'bin/atom/base');
  const dest = path.join(process.cwd(), 'src/atoms', `${name.kebabCase}s`);

  if (crud) {
    await copyCrudAtom(name, src, dest);
  } else {
    copyBaseAtom(name, src, dest);
  }

  addAtomRoute(name);
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
