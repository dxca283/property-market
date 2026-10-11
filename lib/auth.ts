import { prisma } from "@/database/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path

function createAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;
  if (!secret || !baseURL) {
    throw new Error("BETTER_AUTH_SECRET and BETTER_AUTH_URL are required");
  }

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    secret,
    baseURL,
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "USER",
          input: false
        }
      }
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    emailAndPassword: {
      enabled: true,
    },
  });
}

type AppAuth = ReturnType<typeof createAuth>;
let auth: AppAuth | undefined;

export function getAuth(): AppAuth {
  auth ??= createAuth();
  return auth;
}
