import type * as Schema from './schemas';
import prisma from '../../prisma';

export const findOneById = async (id: string) => {
  const object = await prisma.object.findUnique({ where: { id } });

  return object;
};

export const findMany = async (query: Schema.Query) => {
  const count = await prisma.object.count();
  const objects = await prisma.object.findMany({
    skip: query.skip,
    take: query.take,
  });

  return [count, objects];
};

export const create = async (data: Schema.Create) => {
  const object = await prisma.object.create({ data });

  return object;
};

export const update = async (id: string, data: Schema.Update) => {
  const object = await prisma.object.update({ where: { id }, data });

  return object;
};

export const destroy = async (id: string) => {
  await prisma.object.delete({ where: { id } });
};
