"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Conversation } from "@/types/conversation";
import { useQueryClient } from "@tanstack/react-query";

export const useRealtimeConversations = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleConversationUpdate = (conversation: Conversation) => {
      console.log("🔥 receive conversation:update", conversation);

      queryClient.setQueryData(
        ["conversations"],
        (old: Conversation[] | undefined) => {
          if (!old) return old;

          const exists = old.find((c) => c.id === conversation.id);

          if (!exists) {
            return [conversation, ...old];
          }

          return [conversation, ...old.filter((c) => c.id !== conversation.id)];
        },
      );
    };

    socket.on("conversations:update", handleConversationUpdate);

    return () => {
      socket.off("conversations:update", handleConversationUpdate);
    };
  }, [queryClient]);
};
