import { getRedis } from "./redis";

export async function getCache<T>(key: string): Promise<T | null> {
  const cached = await getRedis().get<T>(key);

  return cached ?? null;
}

export async function setCache<T>(key: string, value: T, ttl = 300) {
  await getRedis().set(key, value, {
    ex: ttl,
  });
}

export async function deleteCache(key: string) {
  await getRedis().del(key);
}
