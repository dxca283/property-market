"use client";

import { Conversation } from "@/types/conversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId?: string;
  onClick: () => void;
}

const ConversationItem = ({
  conversation,
  currentUserId,
  onClick,
}: ConversationItemProps) => {
  const isOwner = conversation.sellerId === currentUserId;
  const otherUser = isOwner ? conversation.buyer : conversation.seller;
  const unreadCount = isOwner
    ? conversation.sellerUnread
    : conversation.buyerUnread;

  const displayName = `${conversation.property.title} - ${
    isOwner ? "Mine" : otherUser?.name || "Unknown"
  }`;

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-2 rounded-lg hover:bg-accent transition-colors"
    >
      <div className="flex gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.property.image} />

          <AvatarFallback>
            {conversation.property.title.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate" title={displayName}>
              {displayName}
            </h3>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage || "No messages yet"}
            </p>

            {unreadCount > 0 && <Badge className="ml-2">{unreadCount}</Badge>}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
