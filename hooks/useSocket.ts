"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useChatStore } from "@/store/useChatStore";

export const useSocket = () => {
  const { selectedConversationId } = useChatStore();

  useEffect(() => {
    if (!selectedConversationId) return;

    const onConnect = () => {
      console.log("Join", selectedConversationId);
      socket.emit("join-conversation", selectedConversationId);
    };

    socket.on("connect", onConnect);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      console.log("Leave", selectedConversationId);
      socket.off("connect", onConnect);
      socket.emit("leave-conversation", selectedConversationId);
    };
  }, [selectedConversationId]);
};