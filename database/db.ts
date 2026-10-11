import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@/app/generated/prisma/client'

let client: PrismaClient | undefined;

function getPrismaClient() {
  if (!client) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is required to access the database');
    }

    const adapter = new PrismaNeon({ connectionString });
    client = new PrismaClient({ adapter });
  }

  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const value = Reflect.get(getPrismaClient(), property);
    return typeof value === 'function' ? value.bind(getPrismaClient()) : value;
  },
});
