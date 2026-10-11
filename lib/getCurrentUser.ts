import "server-only";
import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    return null;
  }
  return {
    id: session.user.id,
    role: session.user.role,
  };
};
