import { Request } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";

export const fields = {
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(32),
};

export const login = (req: Request) => {
  const schema = z.object({
    username: fields.username,
    password: fields.password,
  });

  return schema.parse(req.body);
};

export const register = async (req: Request) => {
  const schema = z.object({
    username: fields.username,
    password: fields.password.transform((value) => bcrypt.hash(value, 12)),
    firstName: z.string().min(2).max(32).optional(),
    lastName: z.string().min(2).max(32).optional(),
    email: z.string().email().optional(),
  });

  return schema.parseAsync(req.body);
};

export const refreshToken = (req: Request) => {
  const schema = z.object({
    refreshToken: z.string(),
  });

  return schema.parse(req.body);
};
