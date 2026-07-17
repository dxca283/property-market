"use client";

import { SendMessageValues } from "@/schemas/message.schema";
import { messageService } from "@/services/message.service";
import { useChatStore } from "@/store/useChatStore";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { GetMessagesResponse, Message } from "@/types/message";
import { authClient } from "@/lib/auth-client";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  return useMutation({
    mutationFn: (body: SendMessageValues) => messageService.sendMessage(body),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", variables.conversationId],
      });

      const previous = queryClient.getQueryData<
        InfiniteData<GetMessagesResponse>
      >(["messages", variables.conversationId]);

      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,

        conversationId: variables.conversationId!,

        senderId: session?.user.id || "",

        content: variables.content,

        imageUrl: null,

        isRead: true,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ["messages", variables.conversationId],

        (old: InfiniteData<GetMessagesResponse> | undefined) => {
          if (!old) return old;

          const pages = [...old.pages];

          pages[0] = {
            ...pages[0],

            messages: [...pages[0].messages, optimisticMessage],
          };

          return {
            ...old,

            pages,
          };
        },
      );

      return {
        previous,

        tempId: optimisticMessage.id,
      };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["messages", variables.conversationId],

        context?.previous,
      );
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ["messages", variables.conversationId],

        (old: InfiniteData<GetMessagesResponse> | undefined) => {
          if (!old) return old;

          const pages = [...old.pages];

          pages[0] = {
            ...pages[0],

            messages: pages[0].messages.map((m) =>
              m.id === context?.tempId ? data.message : m,
            ),
          };

          return {
            ...old,

            pages,
          };
        },
      );
    },
  });
};
