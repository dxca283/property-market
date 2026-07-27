"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { authClient } from "@/lib/auth-client";

export const useSocketConnection = () => {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user.id) return;

    const userId = session.user.id;

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("join-user", userId);
    };

    const onDisconnect = () => {
      console.log("❌ Socket disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    if (socket.connected) {
      onConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.disconnect();
    };
  }, [session?.user.id]);
};