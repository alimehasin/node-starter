import { z } from 'zod';
import * as schemas from './schemas';

export interface ObjectShape {
  id: string;
//_0
}


export type Query = z.infer<typeof schemas.query>;
export type Create = z.infer<typeof schemas.create>;
export type Update = z.infer<typeof schemas.update>;
