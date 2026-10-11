import { Redis } from '@upstash/redis'

let redis: Redis | undefined;

export function getRedis() {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required');
    }

    redis = Redis.fromEnv();
  }

  return redis;
}
