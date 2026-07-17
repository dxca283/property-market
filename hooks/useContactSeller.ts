"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { useChatStore } from "@/store/useChatStore";
import { Conversation } from "@/types/conversation";

export const useContactSeller = () => {
  const queryClient = useQueryClient();

  const { closeContactModal, openChat, selectConversation } = useChatStore();

  return useMutation({
    mutationFn: ({
      propertyId,
      content,
    }: {
      propertyId: string;
      content: string;
    }) =>
      messageService.sendMessage({
        propertyId,
        content,
      }),

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["conversations"],
        (old: Conversation[] | undefined) => {
          if (!old) return [data.conversation];

          return [
            data.conversation,
            ...old.filter((c) => c.id !== data.conversation.id),
          ];
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["messages", data.conversation.id],
      });
      closeContactModal();

      openChat();

      selectConversation(data.conversation.id);
    },
  });
};
