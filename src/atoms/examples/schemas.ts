import { z } from "zod";
import { zod } from "../../utils";

export const query = z.object({
  ...zod.pagination,
});

export const create = z.object({
  title: z.string().max(100),
  desc: z.string().max(1000),
});

export const update = create.partial();

export type Query = z.infer<typeof query>;
export type Crate = z.infer<typeof create>;
export type Update = z.infer<typeof update>;
