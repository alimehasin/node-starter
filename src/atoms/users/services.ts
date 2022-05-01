import _ from 'lodash';
import { Request } from 'express';
import { Prisma, User } from '@prisma/client';
import prisma from '../../prisma';

type ReshapedUser = Omit<User, 'password' | 'revokeTokensBefore'>;

export const reshape = (user: User | null): ReshapedUser => {
  return _.omit(user, ['password', 'revokeTokensBefore']);
};

export const createUser = async (
  req: Request,
  data: Prisma.UserCreateInput,
  shouldReshape = true
) => {
  const user = await prisma.user.create({ data });

  return shouldReshape ? reshape(user) : user;
};

export const getUserById = async (req: Request, id: string, shouldReshape = true) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return shouldReshape ? reshape(user) : user;
};

export const getUserByUsername = async (
  req: Request,
  username: string,
  shouldReshape = true
) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return shouldReshape ? reshape(user) : user;
};

export const setPassword = async (req: Request, username: string, password: string) => {
  const user = await prisma.user.update({ where: { username }, data: { password } });

  return user;
};

export const setRevokeTokensBefore = async (req: Request, username: string) => {
  await prisma.user.update({
    where: { username },
    data: { revokeTokensBefore: new Date() },
  });
};
