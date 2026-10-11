"use server"
import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { approvePropertyService, rejectPropertyService } from "@/services/property.service";

async function requireAdmin() {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return session;
}

export async function approvePropertyAction(propertyId: string) {
  await requireAdmin();
  
  return await approvePropertyService(propertyId);
}

export async function rejectPropertyAction(propertyId: string, reason: string) {
  await requireAdmin();

  return await rejectPropertyService(propertyId, reason);
}
