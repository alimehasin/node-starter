import type * as Schema from "./schemas";
import prisma from "../../prisma";

export default class Service {
  findOneById = async (id: string) => {
    const example = await prisma.example.findUnique({ where: { id } });

    return example;
  };

  findMany = async (query: Schema.Query) => {
    const count = await prisma.example.count();
    const examples = await prisma.example.findMany({
      skip: query.skip,
      take: query.take,
    });

    return [count, examples];
  };

  create = async (data: Schema.Crate) => {
    const example = await prisma.example.create({ data });

    return example;
  };

  update = async (id: string, data: Schema.Update) => {
    const example = await prisma.example.update({ where: { id }, data });

    return example;
  };

  delete = async (id: string) => {
    await prisma.example.delete({ where: { id } });
  };
}
