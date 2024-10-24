const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = (global.prismaGlobal ?? prismaClientSingleton());

// Exportando a instância do Prisma Client
module.exports = prisma;

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}
