import { z } from 'zod';
import { PAGE_SIZE } from './secrets';

export const pagination = {
  page: z.string().default('1').transform(parseInt),
  pageSize: z.string().default(PAGE_SIZE.toString()).transform(parseInt),
};

export const trim = (validate: z.ZodString) => {
  return z.preprocess(
    (value: unknown) => (typeof value === 'string' ? value.trim() : value),
    validate
  );
};
