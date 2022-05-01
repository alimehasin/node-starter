import { Request } from 'express';
import type * as Schema from './schemas';
import prisma from '../../prisma';

export const _getById = async (req: Request, id: string) => {
  const _object = await prisma._object.findUnique({ where: { id } });

  return _object;
};

export const findOneById = async (req: Request, id: string) => {
  const _object = await prisma._object.findUnique({ where: { id } });

  return _object;
};

export const findMany = async (req: Request, query: Schema.Query) => {
  const count = await prisma._object.count();

  const _objects = await prisma._object.findMany({
    skip: query.skip,
    take: query.take,
  });

  return [count, _objects];
};

export const create = async (req: Request, data: Schema.Create) => {
  const _object = await prisma._object.create({ data });

  return _object;
};

export const update = async (req: Request, id: string, data: Schema.Update) => {
  const _object = await prisma._object.update({ where: { id }, data });

  return _object;
};

export const destroy = async (req: Request, id: string) => {
  await prisma._object.delete({ where: { id } });
};
