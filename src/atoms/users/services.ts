import _ from "lodash";
import { Prisma, User } from "@prisma/client";
import prisma from "../../prisma";

export const reshape = (user: User | null, perform: boolean) => {
  if (user && perform) {
    return _.omit(user, ["password"]);
  }

  return user;
};

export const createUser = async (data: Prisma.UserCreateInput, shouldReshape = true) => {
  const user = await prisma.user.create({ data });

  return reshape(user, shouldReshape);
};

export const getUserById = async (id: string, shouldReshape = true) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return reshape(user, shouldReshape);
};

export const getUserByUsername = async (username: string, shouldReshape = true) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return reshape(user, shouldReshape);
};
