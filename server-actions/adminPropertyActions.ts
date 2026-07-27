"use server";
import { prisma } from "@/database/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({
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

export async function approveProperty(propertyId: string) {
  await requireAdmin();

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "PENDING") {
    throw new Error("Property has already been reviewed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProperty = await tx.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        rejectionReason: null,
      },
    });

    const notification = await tx.notification.create({
      data: {
        userId: property.ownerId,

        type: "PROPERTY",

        title: "Property Approved",

        message: `Your property "${property.title}" has been approved.`,

        data: {
          action: "approved",
          propertyId: property.id,
        },
      },
    });

    return {
      updatedProperty,
      notification,
    };
  });

  return result;
}

export async function rejectProperty(propertyId: string, reason: string) {
  await requireAdmin();

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "PENDING") {
    throw new Error("Property has already been reviewed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProperty = await tx.property.update({
      where: {
        id: propertyId,
      },

      data: {
        status: "REJECTED",

        rejectedAt: new Date(),

        rejectionReason: reason,
      },
    });

    const notification = await tx.notification.create({
      data: {
        userId: property.ownerId,

        type: "PROPERTY",

        title: "Property Rejected",

        message: `Your property "${property.title}" has been rejected.`,

        data: {
          action: "rejected",
          propertyId: property.id,
          reason,
        },
      },
    });

    return {
      updatedProperty,
      notification,
    };
  });

  return result;
}
