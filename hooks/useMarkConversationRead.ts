import { conversationService } from "@/services/conversation.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Conversation } from "@/types/conversation";

let debounceTimer: NodeJS.Timeout | null = null;
export const useMarkConversationRead = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (conversationId: string) =>
      conversationService.markAsRead(conversationId),

    onMutate: async (conversationId) => {
      await queryClient.cancelQueries({
        queryKey: ["conversations"],
      });

      const previous = queryClient.getQueryData<Conversation[]>([
        "conversations",
      ]);

      queryClient.setQueryData(
        ["conversations"],
        (old: Conversation[] | undefined) => {
          if (!old) return old;

          return old.map((conversation) => {
            if (conversation.id !== conversationId) {
              return conversation;
            }

            return {
              ...conversation,
              buyerUnread: 0,
              sellerUnread: 0,
            };
          });
        },
      );

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["conversations"], context?.previous);
    }
  });
  const markConversationRead = (conversationId: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      mutation.mutate(conversationId);
    }, 500);
  };
  return {
    ...mutation,
    mutate: markConversationRead
  }
};
