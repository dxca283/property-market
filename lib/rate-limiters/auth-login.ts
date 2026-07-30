import { rateLimit } from "@/lib/rate-limit";

interface LoginRateLimitInput {
  email?: string;
  ip: string;
}

export async function checkLoginRateLimit({ email, ip }: LoginRateLimitInput) {
  // Limit theo IP
  const ipLimit = await rateLimit({
    key: `auth:login:ip:${ip}`,
    limit: 20,
    window: 60,
  });

  if (!ipLimit.success) {
    return {
      success: false,
      reason: "ip",
      retryAfter: ipLimit.reset,
    };
  }

  // Limit theo email
  if (email) {
    const emailLimit = await rateLimit({
      key: `auth:login:email:${email}`,
      limit: 5,
      window: 60,
    });

    if (!emailLimit.success) {
      return {
        success: false,
        reason: "email",
        retryAfter: emailLimit.reset,
      };
    }
  }

  return {
    success: true,
  };
}
