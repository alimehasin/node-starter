/* eslint-disable no-unused-vars */

import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
