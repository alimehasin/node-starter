import { z } from 'zod';

export const pagination = {
  skip: z.string().default('0').transform(parseInt),
  take: z.string().default('25').transform(parseInt),
};

export const trim = (validate: z.ZodString) => {
  return z.preprocess(
    (value: unknown) => (typeof value === 'string' ? value.trim() : value),
    validate
  );
};
