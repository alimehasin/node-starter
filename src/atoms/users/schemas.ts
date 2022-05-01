import bcrypt from 'bcrypt';
import { Request } from 'express';
import { z } from 'zod';
import prisma from '../../prisma';
import { SimpleError } from '../../utils/errors';
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

    email: signup.shape.email.refine(
      async (email) => {
        const user = await prisma.user.findUnique({ where: { email } });

        return !user;
      },
      { message: translate(req, 'emailUsed') }
    ),
  });

  return schema.parseAsync(body);
};

export const editProfile = signup.partial();

export const editProfileValidator = (req: Request, body: any) => {
  if (!req.user) {
    throw new SimpleError(500, translate(req, 'serverError'));
  }

  const schema = editProfile
    .extend({
      username: editProfile.shape.username.refine(
        async (username) => {
          if (req.user?.username === username) {
            return true;
          }

          const user = await prisma.user.findUnique({ where: { username } });

          return !user;
        },
        { message: translate(req, 'usernameExists') }
      ),

      email: editProfile.shape.email.refine(
        async (email) => {
          if (req.user?.email === email) {
            return true;
          }

          const user = await prisma.user.findUnique({ where: { email } });

          return !user;
        },
        { message: translate(req, 'emailUsed') }
      ),
    })
    .partial();

  return schema.parseAsync(body);
};

export const changePassword = z.object({
  oldPassword: z.string(),
  newPassword: fields.password,
});

export type Login = z.infer<typeof login>;
export type Signup = z.infer<typeof signup>;
export type EditProfile = z.infer<typeof editProfile>;
export type ChangePassword = z.infer<typeof changePassword>;
