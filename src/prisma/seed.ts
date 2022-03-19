import { PrismaClient } from '@prisma/client';
import { logger } from '../utils';

const prisma = new PrismaClient();

const main = async () => {
  // Write your seed here
};

main()
  .catch((error) => {
    logger.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
