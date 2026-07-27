"use client";

import { ArrowLeft, X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useConversations } from "@/hooks/useConversations";
import { authClient } from "@/lib/auth-client";
import { Conversation } from "@/types/conversation";

const ChatDetailHeader = () => {
  const { backToList, closeChat, selectedConversationId } = useChatStore();
  const { data: session } = authClient.useSession();
  const { data: conversations } = useConversations();

  const currentUserId = session?.user?.id;
  const conversation = conversations?.find(
    (c: Conversation) => c.id === selectedConversationId,
  );
  const isOwner = conversation?.sellerId === currentUserId;
  const otherUser = isOwner ? conversation?.buyer : conversation?.seller;

  const displayName = conversation
    ? `${conversation.property.title} - ${
        isOwner ? "Mine" : otherUser?.name || "Unknown"
      }`
    : "Loading...";

  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={backToList}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <p className="font-medium truncate max-w-50 md:max-w-75">
            {displayName}
          </p>

          <p className="text-xs text-muted-foreground">
            {conversation ? "Online" : ""}
          </p>
        </div>
      </div>

      <button
        onClick={closeChat}
        className="p-2 hover:bg-black/5 rounded-full transition-colors border"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatDetailHeader;
