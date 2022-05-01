import bcrypt from 'bcrypt';
import { Request } from 'express';
import { z } from 'zod';
import prisma from '../../prisma';
import { translate } from '../../utils/i18n';

const fields = {
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(64),
};

export const login = z.object({
  username: z.string().max(128),
  password: z.string().max(128),
});

export const signup = z.object({
  username: fields.username,
  password: fields.password.transform((value) => bcrypt.hash(value, 12)),
  firstName: z.string().min(2).max(32).optional(),
  lastName: z.string().min(2).max(32).optional(),
  email: z.string().email().optional(),
});

export const signupValidator = (req: Request, body: any) => {
  const schema = signup.extend({
    username: signup.shape.username.refine(
      async (username) => {
        const user = await prisma.user.findUnique({ where: { username } });

        return !user;
      },
      { message: translate(req, 'usernameExists') }
    ),
  });

  return schema.parseAsync(body);
};

export const changePassword = z.object({
  oldPassword: z.string(),
  newPassword: fields.password,
});

export type Login = z.infer<typeof login>;
export type Signup = z.infer<typeof signup>;
export type ChangePassword = z.infer<typeof changePassword>;
