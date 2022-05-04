import { z } from 'zod';
import { PAGE_SIZE } from './secrets';

export const pagination = {
  page: z.number().default(1),
  pageSize: z.number().default(PAGE_SIZE),
};

export const trim = (validate: z.ZodString) => {
  return z.preprocess(
    (value: unknown) => (typeof value === 'string' ? value.trim() : value),
    validate
  );
};
