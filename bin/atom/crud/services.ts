import { _Object } from '@prisma/client';
import type * as Schema from './schemas';
import { _ObjectShape } from './types';
import prisma from '../../prisma';
import { getPaginationInfo, calcPaginationOffset } from '../../utils/helpers';
import { PaginatedResponse } from '../../types';

export function shape(_object: _Object): _ObjectShape {
  return { ..._object };
}

export function shapeNullable(_object: _Object | null): _ObjectShape | null {
  return _object ? shape(req, _object) : null;
}

export async function _get_ObjectById(id: string): Promise<_Object | null> {
  const _object = await prisma._object.findUnique({ where: { id } });

  return _object;
}

export async function findOneById(id: string): Promise<_ObjectShape | null> {
  const _object = await prisma._object.findUnique({ where: { id } });

  return shapeNullable(req, _object);
}

export async function findMany(
  query: Schema.Query
): Promise<PaginatedResponse<_ObjectShape>> {
  const count = await prisma._object.count();
  const paginationInfo = getPaginationInfo(count, query);
  const paginationOffset = calcPaginationOffset(query.page, query.pageSize);

  const _objects = await prisma._object.findMany({
    ...paginationOffset,
  });

  return {
    ...paginationInfo,
    results: _objects.map((_object) => shape(req, _object)),
  };
}

export async function create(data: Schema.Create): Promise<_ObjectShape> {
  const _object = await prisma._object.create({ data });

  return shape(req, _object);
}

export async function update(
  id: string,
  data: Schema.Update
): Promise<_ObjectShape | null> {
  const _object = await prisma._object.update({ where: { id }, data });

  return shapeNullable(req, _object);
}

export async function destroy(id: string): Promise<void> {
  await prisma._object.delete({ where: { id } });
}
