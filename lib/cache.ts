import { redis } from "./redis";

export async function getCache<T>(key: string): Promise<T | null> {
  const cached = await redis.get<T>(key);

  return cached ?? null;
}

export async function setCache<T>(key: string, value: T, ttl = 300) {
  await redis.set(key, value, {
    ex: ttl,
  });
}

export async function deleteCache(key: string) {
  await redis.del(key);
}
