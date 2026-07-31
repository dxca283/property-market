"use server";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationRead,
} from "@/services/notification.service";

import { getCurrentUser } from "../lib/getCurrentUser";

export async function getNotificationsAction() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return getNotifications(user.id);
}

export async function markNotificationReadAction(notificationId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return markNotificationRead(user.id, notificationId);
}

export async function markAllNotificationReadAction() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return markAllNotificationRead(user.id);
}
