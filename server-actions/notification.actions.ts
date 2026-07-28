"use server";

import { prisma } from "@/database/db";

import { getCurrentUser } from "./getCurrentUser";

export async function getNotifications() {
  const user = await getCurrentUser();

  return prisma.notification.findMany({
    where: {
      userId: user?.id,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,
  });
}

export async function markNotificationRead(notificationId: string) {
  const user = await getCurrentUser();

  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  // tránh user sửa notification của người khác

  if (notification.userId !== user?.id) {
    throw new Error("Forbidden");
  }

  return prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isRead: true,
    },
  });
}
export async function markAllNotificationRead() {
  const user = await getCurrentUser();

  return prisma.notification.updateMany({
    where: {
      userId: user?.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}
