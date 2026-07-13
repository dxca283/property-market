"use client";

import { Message } from "@/types/message";
import MessageItem from "./MessageItem";
import { useChatStore } from "@/store/useChatStore";
import { useMessages } from "@/hooks/useMessages";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";

const MessageList = () => {
  const { selectedConversationId } = useChatStore();
  const { data: session } = authClient.useSession();

  const { data, isLoading, isError } = useMessages(
    selectedConversationId
  );

  const currentUserId = session?.user?.id;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !data) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [selectedConversationId, data]);

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

  return (
    <div
      ref={scrollRef}
      className="flex-1 min-h-0 overflow-y-auto"
    >
      <div className="flex flex-col gap-3 p-4">
        {data.pages.map((page, i) => (
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