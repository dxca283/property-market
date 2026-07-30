import { redis } from "./redis";

interface RateLimitOptions {
  key: string;
  limit: number;
  window: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

const rateLimitScript = `
local count = redis.call("INCR", KEYS[1])

if count == 1 then
  redis.call(
    "EXPIRE",
    KEYS[1],
    ARGV[1]
  )
end

local ttl = redis.call(
  "TTL",
  KEYS[1]
)

return {count, ttl}
`;

export async function rateLimit({
  key,
  limit,
  window,
}: RateLimitOptions): Promise<RateLimitResult> {
  const result = (await redis.eval(rateLimitScript, [key], [window])) as [
    number,
    number,
  ];

  const currentCount = Number(result[0]);
  const ttl = Number(result[1]);

  if (currentCount > limit) {
    return {
      success: false,
      remaining: 0,
      reset: ttl,
    };
  }

  return {
    success: true,
    remaining: limit - currentCount,
    reset: ttl,
  };
}
