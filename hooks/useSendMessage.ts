"use client";

import { SendMessageValues } from "@/schemas/message.schema";
import { messageService } from "@/services/message.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SendMessageValues) => messageService.sendMessage(body),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};