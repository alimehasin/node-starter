import { z } from 'zod';
import { zod } from '../../utils';

export const query = z.object({
  ...zod.pagination,
});

export const create = z.object({
//_0
});

export const update = create.partial();
