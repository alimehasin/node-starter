import type * as Schema from "./schemas";
import prisma from "../../prisma";

export default class Service {
  findOneById = async (id: string) => {
    const object = await prisma.object.findUnique({ where: { id } });

    return object;
  };

  findMany = async (query: Schema.Query) => {
    const count = await prisma.object.count();
    const objects = await prisma.object.findMany({
      skip: query.skip,
      take: query.take,
    });

    return [count, objects];
  };

  create = async (data: Schema.Crate) => {
    const object = await prisma.object.create({ data });

    return object;
  };

  update = async (id: string, data: Schema.Update) => {
    const object = await prisma.object.update({ where: { id }, data });

    return object;
  };

  delete = async (id: string) => {
    await prisma.object.delete({ where: { id } });
  };
}
