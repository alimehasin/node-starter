import { z } from 'zod';

export const pagination = {
  skip: z.string().default('0').transform(parseInt),
  take: z.string().default('25').transform(parseInt),
};
