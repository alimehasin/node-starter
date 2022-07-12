import { User as PrismaUser } from '@prisma/client';
import { TranslationFn } from '.';

declare global {
  namespace Express {
    interface User extends PrismaUser {}

    interface Request {
      object: any;
      t: TranslationFn;
    }
  }
}
