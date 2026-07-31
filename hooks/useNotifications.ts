"use client";

import { getNotificationsAction } from "@/server-actions/notification.actions";
import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: () => getNotificationsAction(),
  });
}
