import { conversationService } from "@/services/conversation.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkConversationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      conversationService.markAsRead(conversationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};