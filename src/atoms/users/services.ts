import _ from 'lodash';
import { Request } from 'express';
import { User } from '@prisma/client';
import * as schemas from './schemas';
import { UserShape } from './types';
import prisma from '../../prisma';

export const shape = (user: User): UserShape => {
  return {
    ..._.pick(user, ['id', 'username', 'firstName', 'lastName', 'email']),
  };
};

export const shapeNullable = (user: User | null): UserShape | null => {
  return user ? shape(user) : null;
};

export const _getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};

export const _getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
};

export const _getUserByUsername = async (username: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { username } });

  return user;
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
  const user = await _getUserById(id);

  return shapeNullable(user);
};

export const getUserByUsername = async (
  req: Request,
  username: string
): Promise<UserShape | null> => {
  const user = await _getUserByUsername(username);

  return shapeNullable(user);
};

export const setPassword = async (
  req: Request,
  id: string,
  password: string
): Promise<UserShape | null> => {
  const user = await prisma.user.update({ where: { id }, data: { password } });

  return shapeNullable(user);
};

export const setRevokeTokensBefore = async (
  req: Request,
  id: string
): Promise<UserShape | null> => {
  const user = await prisma.user.update({
    where: { id },
    data: { revokeTokensBefore: new Date() },
  });

  return shapeNullable(user);
};

export const editProfile = async (
  req: Request,
  id: string,
  data: schemas.EditProfile
): Promise<UserShape | null> => {
  const user = await prisma.user.update({ where: { id }, data });

  return shapeNullable(user);
};
