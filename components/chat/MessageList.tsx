"use client";

import { Message } from "@/types/message";
import MessageItem from "./MessageItem";
import { useChatStore } from "@/store/useChatStore";
import { useMessages } from "@/hooks/useMessages";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { socket } from "@/lib/socket";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";

const MessageList = () => {
  const { selectedConversationId } = useChatStore();
  useRealtimeMessages(selectedConversationId);
  const { data: session } = authClient.useSession();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(selectedConversationId);

  const currentUserId = session?.user?.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const stateRef = useRef({
    conversationId: selectedConversationId,
    pagesLength: 0,
    lastMessageId: null as string | null,
    hasInitialScrolled: false,
    oldScrollHeight: 0,
  });

  if (stateRef.current.conversationId !== selectedConversationId) {
    stateRef.current = {
      conversationId: selectedConversationId,
      pagesLength: 0,
      lastMessageId: null,
      hasInitialScrolled: false,
      oldScrollHeight: 0,
    };
  }

  if (scrollRef.current) {
    stateRef.current.oldScrollHeight = scrollRef.current.scrollHeight;
  }

  useLayoutEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || !data?.pages || data.pages.length === 0) return;

    const currentPagesLength = data.pages.length;
    const firstPage = data.pages[0];
    const currentLastMessageId =
      firstPage.messages.length > 0
        ? firstPage.messages[firstPage.messages.length - 1].id
        : null;

    if (!stateRef.current.hasInitialScrolled) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
      stateRef.current.hasInitialScrolled = true;
    } else if (
      currentPagesLength > stateRef.current.pagesLength &&
      stateRef.current.pagesLength > 0
    ) {
      const newScrollHeight = scrollEl.scrollHeight;
      const heightDifference =
        newScrollHeight - stateRef.current.oldScrollHeight;
      scrollEl.scrollTop += heightDifference;
    } else if (
      currentLastMessageId !== stateRef.current.lastMessageId &&
      stateRef.current.lastMessageId
    ) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }

    stateRef.current.pagesLength = currentPagesLength;
    stateRef.current.lastMessageId = currentLastMessageId;
  }, [data?.pages]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
      },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-sm text-muted-foreground">
        Failed to load messages.
      </div>
    );
  }

  if (
    !data?.pages ||
    data.pages.length === 0 ||
    data.pages[0].messages.length === 0
  ) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-sm text-muted-foreground">
        No messages yet.
      </div>
    );
  }

  const reversedPages = [...data.pages].reverse();

  return (
    <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col gap-3 p-4">
        <div ref={sentinelRef} className="h-1 w-full shrink-0" />

        {isFetchingNextPage && (
          <div className="flex justify-center py-2 shrink-0">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {reversedPages.map((page, i) => (
          <React.Fragment key={i}>
            {page.messages.map((message: Message) => (
              <MessageItem
                key={message.id}
                message={message}
                isMine={message.senderId === currentUserId}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
