"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ConversationItem from "./ConversationItem";
import { useChatStore } from "@/store/useChatStore";
import { useConversations } from "@/hooks/useConversations";
import { authClient } from "@/lib/auth-client";
import { Conversation } from "@/types/conversation";
import { useMarkConversationRead } from "@/hooks/useMarkConversationRead";

const ConversationList = () => {
  const { selectConversation } = useChatStore();
  const { data: session } = authClient.useSession();
  const { data: conversations, isLoading } = useConversations();
  const { mutate: markAsRead } = useMarkConversationRead();

  const handleOpenConversation = (conversation: Conversation) => {
    selectConversation(conversation.id);

    const isBuyer = conversation.buyerId === session?.user.id;
    const unreadCount = isBuyer
      ? conversation.buyerUnread
      : conversation.sellerUnread;

    if (unreadCount > 0) {
      markAsRead(conversation.id);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        Loading conversations...
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        No conversations found.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full overscroll-contain">
      <div className="space-y-1">
        {conversations.map((conversation: Conversation, index: number) => (
          <div key={conversation.id}>
            <ConversationItem
              conversation={conversation}
              currentUserId={session?.user?.id}
              onClick={() => handleOpenConversation(conversation)}
            />

            {index !== conversations.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
