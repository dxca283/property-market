import { auth } from "@/lib/auth"; // path to your auth file
import { checkLoginRateLimit } from "@/lib/rate-limiters/auth-login";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function POST(request: Request) {
  const url = new URL(request.url);

  /**
   * Chỉ rate limit login
   * Không block:
   * - signup
   * - session
   * - oauth callback
   */
  if (url.pathname.endsWith("/sign-in/email")) {
    const body = await request.clone().json();

    const email = body.email?.toLowerCase().trim();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    const result = await checkLoginRateLimit({
      email,
      ip,
    });

    if (!result.success) {
      // Chỉ IP bị block mới trả 429
      if (result.reason === "ip") {
        return Response.json(
          {
            message: "Too many login attempts",
            retryAfter: result.retryAfter,
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(result.retryAfter),
            },
          },
        );
      }

      // Email bị limit:
      // không tiết lộ trạng thái email
      // delay nhẹ rồi cho login chạy tiếp
      if (result.reason === "email") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    if (!result.success) {
      return Response.json(
        {
          message: "Too many login attempts",
          retryAfter: result.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(result.retryAfter),
          },
        },
      );
    }
  }

  return handler.POST(request);
}

export const GET = handler.GET;
