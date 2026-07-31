"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";


import { Notification } from "@/types/notification";
import { markNotificationReadAction } from "@/server-actions/notification.actions";

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationReadAction,

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);

      queryClient.setQueryData<Notification[]>(
        ["notifications"],

        (old) => {
          if (!old) return old;

          return old.map((notification) => {
            if (notification.id === notificationId) {
              return {
                ...notification,
                isRead: true,
              };
            }

            return notification;
          });
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
