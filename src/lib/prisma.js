/**
 * Prisma Client 单例模式
 *
 * 在开发环境中，由于 Next.js 的热重载机制，会导致创建多个 Prisma Client 实例
 * 使用全局变量来缓存实例，避免开发环境中的连接数过多问题
 */

import { PrismaClient } from '@prisma/client';

// 全局缓存变量
const globalForPrisma = global;

// 创建或复用 Prisma Client 实例
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// 在开发环境中缓存实例
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
