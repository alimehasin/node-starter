import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Write your seed here
};

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
