"use server";
import { prisma } from "@/database/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function approveProperty(propertyId: string) {
  // Ideally, add admin role check here.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  await prisma.property.update({
    where: { id: propertyId },
    data: { status: "APPROVED" },
  });
}

export async function rejectProperty(propertyId: string, reason: string) {
  // Ideally, add admin role check here.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  await prisma.property.update({
    where: { id: propertyId },
    data: {
      status: "REJECTED",
      rejectionReason: reason,
    },
  });
}
