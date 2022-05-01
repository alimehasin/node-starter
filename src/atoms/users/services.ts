import _ from 'lodash';
import { Request } from 'express';
import { Prisma, User } from '@prisma/client';
import * as schemas from './schemas';
import prisma from '../../prisma';
import { UserShape } from './types';

export const _getById = async (req: Request, id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};

export const _getByUsername = async (req: Request, username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return user;
};

export const shape = (user: User): UserShape => {
  return {
    ..._.pick(user, ['id', 'username', 'firstName', 'lastName', 'email']),
  };
};

export const createUser = async (
  req: Request,
  data: schemas.Signup
): Promise<UserShape> => {
  const user = await prisma.user.create({ data });

  return shape(user);
};

export const getUserById = async (
  req: Request,
  id: string
): Promise<UserShape | null> => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user ? shape(user) : null;
};

export const getUserByUsername = async (
  req: Request,
  username: string
): Promise<UserShape | null> => {
  const user = await prisma.user.findUnique({ where: { username } });

  return user ? shape(user) : null;
};

export const setPassword = async (
  req: Request,
  username: string,
  password: string
): Promise<UserShape | null> => {
  const user = await prisma.user.update({ where: { username }, data: { password } });

  return user ? shape(user) : null;
};

export const setRevokeTokensBefore = async (req: Request, username: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { revokeTokensBefore: new Date() },
  });

  return user ? shape(user) : null;
};

export const editProfile = async (
  req: Request,
  id: string,
  data: schemas.EditProfile
): Promise<UserShape | null> => {
  const user = await prisma.user.update({ where: { id }, data });

  return user ? shape(user) : null;
};
