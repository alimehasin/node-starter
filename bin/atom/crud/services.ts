import { Request } from 'express';
import type * as Schema from './schemas';
import prisma from '../../prisma';

export const _getById = async (req: Request, id: string) => {
  const object = await prisma.object.findUnique({ where: { id } });

  return object;
};

export const findOneById = async (req: Request, id: string) => {
  const object = await prisma.object.findUnique({ where: { id } });

  return object;
};

export const findMany = async (req: Request, query: Schema.Query) => {
  const count = await prisma.object.count();
  const objects = await prisma.object.findMany({
    skip: query.skip,
    take: query.take,
  });

  return [count, objects];
};

export const create = async (req: Request, data: Schema.Create) => {
  const object = await prisma.object.create({ data });

  return object;
};

export const update = async (req: Request, id: string, data: Schema.Update) => {
  const object = await prisma.object.update({ where: { id }, data });

  return object;
};

export const destroy = async (req: Request, id: string) => {
  await prisma.object.delete({ where: { id } });
};
