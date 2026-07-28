"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@/types/notification";
import { markAllNotificationRead } from "@/server-actions/notification.actions";

export function useMarkAllNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationRead,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);

      queryClient.setQueryData<Notification[]>(
        ["notifications"],
        (old) => {
          if (!old) return old;

          return old.map((notification) => ({
            ...notification,
            isRead: true,
          }));
        },
      );

      return { previousNotifications };
    },

    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
