import _ from "lodash";
import { Prisma, User } from "@prisma/client";
import prisma from "../prisma";

export default class Service {
  static reshape = (user: User) => {
    return _.omit(user, ["password", "lastLogin", "deactivatedAt"]);
  };

  createUser = async (data: Prisma.UserCreateInput, reshape = true) => {
    const user = await prisma.user.create({ data });

    return reshape ? Service.reshape(user) : user;
  };

  getUserById = async (id: string, reshape = true) => {
    const user = await prisma.user.findUnique({ where: { id } });

    return user && reshape ? Service.reshape(user) : user;
  };

  getUserByUsername = async (username: string, reshape = true) => {
    const user = await prisma.user.findUnique({ where: { username } });

    return user && reshape ? Service.reshape(user) : user;
  };

  updateLastLogin = async (user: User) => {
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
  };
}
