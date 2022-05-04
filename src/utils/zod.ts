import { z } from 'zod';

export const pagination = {
  page: z.string().default('1').transform(parseInt),
  pageSize: z.string().default('25').transform(parseInt),
};

export const trim = (validate: z.ZodString) => {
  return z.preprocess(
    (value: unknown) => (typeof value === 'string' ? value.trim() : value),
    validate
  );
};
