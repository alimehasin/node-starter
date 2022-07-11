import { _Object } from '@prisma/client';
import type { _ObjectShape, CreateSchema, UpdateSchema, QuerySchema } from './types';
import prisma from '../../prisma';
import { getPaginationInfo, calcPaginationOffset } from '../../utils/helpers';
import { PaginatedResponse } from '../../types';

export function shape(_object: _Object): _ObjectShape {
  return { ..._object };
}

export function shapeNullable(_object: _Object | null): _ObjectShape | null {
  return _object ? shape(_object) : null;
}

export async function _get_ObjectById(id: string): Promise<_Object | null> {
  const _object = await prisma._object.findUnique({ where: { id } });

  return _object;
}

export async function findOneById(id: string): Promise<_ObjectShape | null> {
  const _object = await prisma._object.findUnique({ where: { id } });

  return shapeNullable(_object);
}

export async function findMany(
  query: QuerySchema
): Promise<PaginatedResponse<_ObjectShape>> {
  const count = await prisma._object.count();
  const paginationInfo = getPaginationInfo(count, query);
  const paginationOffset = calcPaginationOffset(query.page, query.pageSize);

  const _objects = await prisma._object.findMany({
    ...paginationOffset,
  });

  return {
    ...paginationInfo,
    results: _objects.map(shape),
  };
}

export async function create(data: CreateSchema): Promise<_ObjectShape> {
  const _object = await prisma._object.create({ data });

  return shape(_object);
}

export async function update(
  id: string,
  data: UpdateSchema
): Promise<_ObjectShape | null> {
  const _object = await prisma._object.update({ where: { id }, data });

  return shapeNullable(_object);
}

export async function destroy(id: string): Promise<void> {
  await prisma._object.delete({ where: { id } });
}
