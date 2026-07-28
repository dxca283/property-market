"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRealtimeNotifications() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNotification = (notification: any) => {
      console.log("🔥 notification:new", notification);
      queryClient.setQueryData<Notification[]>(
        ["notifications"],

        (old) => {
          if (!old) {
            return [notification];
          }

          // Prevent duplicate keys if event is fired multiple times
          if (old.some((n: any) => n.id === notification.id)) {
            return old;
          }

          return [notification, ...old];
        },
      );
      toast.success(notification.title);
    };

    socket.on("notification:new", handleNotification);

    return () => {
      socket.off("notification:new", handleNotification);
    };
  }, [queryClient]);
}
