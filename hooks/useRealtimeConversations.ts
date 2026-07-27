"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Conversation } from "@/types/conversation";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "@/store/useChatStore";

export const useRealtimeConversations = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleConversationUpdate = (conversation: Conversation) => {
      console.log("🔥 receive conversation:update", conversation);

      const selectedConversationId = useChatStore.getState().selectedConversationId;
      
      // Invalidate the messages cache for this conversation if it is not currently open
      // This ensures that when the user opens it, it will fetch the fresh messages
      if (selectedConversationId !== conversation.id) {
        queryClient.invalidateQueries({ queryKey: ["messages", conversation.id] });
      }

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
