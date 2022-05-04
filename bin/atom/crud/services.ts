import { Request } from 'express';
import { _Object } from '@prisma/client';
import type * as Schema from './schemas';
import { _ObjectShape } from './types';
import prisma from '../../prisma';
import { calcPaginationOffset } from '../../utils/helpers';

export const shape = (req: Request, _object: _Object): _ObjectShape => ({
  ..._object,
});

export const shapeNullable = (
  req: Request,
  _object: _Object | null
): _ObjectShape | null => {
  return _object ? shape(req, _object) : null;
};

export const _get_ObjectById = async (
  req: Request,
  id: string
): Promise<_Object | null> => {
  const _object = await prisma._object.findUnique({ where: { id } });

  return _object;
};

export const findOneById = async (
  req: Request,
  id: string
): Promise<_ObjectShape | null> => {
  const _object = await prisma._object.findUnique({ where: { id } });

  return shapeNullable(req, _object);
};

export const findMany = async (
  req: Request,
  query: Schema.Query
): Promise<[number, _ObjectShape[]]> => {
  const count = await prisma._object.count();

  const pagination = calcPaginationOffset(query.page, query.pageSize);

  const _objects = await prisma._object.findMany({
    ...pagination,
  });

  return [count, _objects.map((_object) => shape(req, _object))];
};

export const create = async (
  req: Request,
  data: Schema.Create
): Promise<_ObjectShape> => {
  const _object = await prisma._object.create({ data });

  return shape(req, _object);
};

export const update = async (
  req: Request,
  id: string,
  data: Schema.Update
): Promise<_ObjectShape | null> => {
  const _object = await prisma._object.update({ where: { id }, data });

  return shapeNullable(req, _object);
};

export const destroy = async (req: Request, id: string) => {
  await prisma._object.delete({ where: { id } });
};
