import assert from 'assert';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { z } from 'zod';
import * as services from './services';
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
        const user = await services._getUserByUsername(username);

        return !user;
      },
      { message: translate(req)('usernameExists') }
    ),

    email: signup.shape.email.refine(
      async (email) => {
        if (!email) {
          return true;
        }

        const user = await services._getUserByEmail(email);

        return !user;
      },
      { message: translate(req)('emailUsed') }
    ),
  });

  return schema.parseAsync(body);
};

export const editProfile = signup.partial();

export const editProfileValidator = (req: Request, body: any) => {
  assert(req.user);

  const schema = editProfile
    .extend({
      username: editProfile.shape.username.refine(
        async (username) => {
          assert(req.user);

          if (!username || req.user.username === username) {
            return true;
          }

          const user = await services._getUserByUsername(username);

          return !user;
        },
        { message: translate(req)('usernameExists') }
      ),

      email: editProfile.shape.email.refine(
        async (email) => {
          assert(req.user);

          if (!email || req.user.email === email) {
            return true;
          }

          const user = await services._getUserByEmail(email);

          return !user;
        },
        { message: translate(req)('emailUsed') }
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
