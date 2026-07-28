"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

export const useSocket = (
  conversationId: string | null,
) => {
  useEffect(() => {
    if (!conversationId) return;

    const joinRoom = () => {
      console.log("Join", conversationId);
      socket.emit(
        "join-conversation",
        conversationId,
      );
    };

    socket.on("connect", joinRoom);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      console.log("Leave", conversationId);

      socket.off("connect", joinRoom);

      socket.emit(
        "leave-conversation",
        conversationId,
      );
    };
  }, [conversationId]);
};