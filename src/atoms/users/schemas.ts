import bcrypt from 'bcrypt';
import { z } from 'zod';

const fields = {
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(32),
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

export type Login = z.infer<typeof login>;
export type Signup = z.infer<typeof signup>;
