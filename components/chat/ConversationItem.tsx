"use client";

import { Conversation } from "@/types/conversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: (id: string) => void;
}

const ConversationItem = ({
  conversation,
  onClick,
}: ConversationItemProps) => {
  return (
    <button
      onClick={() => onClick(conversation.id)}
      className="w-full text-left px-3 py-3 rounded-lg hover:bg-accent transition-colors"
    >
      <div className="flex gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar} />

          <AvatarFallback>
            {conversation.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">

          <div className="flex justify-between items-center">

            <h3 className="font-medium truncate">
              {conversation.name}
            </h3>

            <span className="text-xs text-muted-foreground">
              {conversation.time}
            </span>

          </div>

          <div className="flex justify-between items-center mt-1">

            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage}
            </p>

            {conversation.unread > 0 && (
              <Badge className="ml-2">
                {conversation.unread}
              </Badge>
            )}

          </div>

        </div>
      </div>
    </button>
  );
};

export default ConversationItem;