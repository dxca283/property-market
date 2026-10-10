"use client";

import { SendMessageValues } from "@/schemas/message.schema";
import { messageService } from "@/services/message.service";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { GetMessagesResponse, Message } from "@/types/message";
import { authClient } from "@/lib/auth-client";
import { Conversation } from "@/types/conversation";

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
      const previousConversations = queryClient.getQueryData<Conversation[]>([
        "conversations",
      ]);
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
      queryClient.setQueryData(
        ["conversations"],
        (old: Conversation[] | undefined) => {
          if (!old) return old;

          const conversation = old.find(
            (c) => c.id === variables.conversationId,
          );

          if (!conversation) return old;

          const updatedConversation: Conversation = {
            ...conversation,

            lastMessage: variables.content,

            lastMessageAt: new Date().toISOString(),

            lastSenderId: session?.user.id ?? "",
          };

          return [
            updatedConversation,

            ...old.filter((c) => c.id !== conversation.id),
          ];
        },
      );

      return {
        previous,
        tempId: optimisticMessage.id,
        previousConversations,
      };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["messages", variables.conversationId],

        context?.previous,
      );
      queryClient.setQueryData(
        ["conversations"],
        context?.previousConversations,
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
      queryClient.setQueryData(
        ["conversations"],
        (old: Conversation[] | undefined) => {
          if (!old) return old;

          return [
            data.conversation,

            ...old.filter((c) => c.id !== data.conversation.id),
          ];
        },
      );
    },
  });
};
