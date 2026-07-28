"use client";

import { getNotifications } from "@/server-actions/notification.actions";
import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: () => getNotifications(),
  });
}
