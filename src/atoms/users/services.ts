import _ from 'lodash';
import { Prisma, User } from '@prisma/client';
import prisma from '../../prisma';

type ReshapedUser = Omit<User, 'password' | 'revokeTokensBefore'>;

export const reshape = (user: User | null): ReshapedUser => {
  return _.omit(user, ['password', 'revokeTokensBefore']);
};

export const createUser = async (data: Prisma.UserCreateInput, shouldReshape = true) => {
  const user = await prisma.user.create({ data });

  return shouldReshape ? reshape(user) : user;
};

export const getUserById = async (id: string, shouldReshape = true) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return shouldReshape ? reshape(user) : user;
};

export const getUserByUsername = async (username: string, shouldReshape = true) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return shouldReshape ? reshape(user) : user;
};

export const setPassword = async (username: string, password: string) => {
  const user = await prisma.user.update({ where: { username }, data: { password } });

  return user;
};

export const setRevokeTokensBefore = async (username: string) => {
  await prisma.user.update({
    where: { username },
    data: { revokeTokensBefore: new Date() },
  });
};
