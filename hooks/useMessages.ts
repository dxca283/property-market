"use client";

import { messageService } from "@/services/message.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMessages = (conversationId: string | null) => {
  return useInfiniteQuery({
    queryKey: ["messages", conversationId],

    enabled: !!conversationId,

    initialPageParam: null as string | null,

    queryFn: ({ pageParam }) =>
      messageService.getMessages(conversationId!, pageParam ?? undefined),
    staleTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
