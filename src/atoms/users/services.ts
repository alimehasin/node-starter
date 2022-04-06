import _ from 'lodash';
import { Prisma, User } from '@prisma/client';
import prisma from '../../prisma';

type ReshapedUser = Omit<User, 'password'>;

export const reshape = (user: User | null): ReshapedUser => {
  return _.omit(user, ['password']);
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
