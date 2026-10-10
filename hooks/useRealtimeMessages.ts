"use client";

import { useCallback, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { GetMessagesResponse, Message } from "@/types/message";
import { authClient } from "@/lib/auth-client";
import { useMarkConversationRead } from "./useMarkConversationRead";
import { useChatStore } from "@/store/useChatStore";

export const useRealtimeMessages = (conversationId: string | null) => {
  const queryClient = useQueryClient();
  const { mutate } = useMarkConversationRead();
  const { data: session } = authClient.useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounceMarkRead = useCallback((id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      mutate(id);
    }, 500);
  }, [mutate]);
  useEffect(() => {
    if (!conversationId) return;

    const handleNewMessage = ({
      message,
      senderId,
    }: {
      message: Message;
      senderId: string;
    }) => {
      // Không nhận lại tin nhắn của chính mình
      if (senderId === session?.user.id) {
        return;
      }

      queryClient.setQueryData(
        ["messages", conversationId],

        (old: InfiniteData<GetMessagesResponse> | undefined) => {
          if (!old) return old;

          const pages = [...old.pages];

          pages[0] = {
            ...pages[0],

            messages: [...pages[0].messages, message],
          };

          return {
            ...old,
            pages,
          };
        },
      );
      const isCurrentConversation =
        useChatStore.getState().selectedConversationId === conversationId;

      if (isCurrentConversation) {
        debounceMarkRead(conversationId);
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [conversationId, debounceMarkRead, queryClient, session]);
};
