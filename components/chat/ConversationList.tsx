"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ConversationItem from "./ConversationItem";
import { Conversation } from "@/types/conversation";
import { useChatStore } from "@/store/useChatStore";

const conversations: Conversation[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Is this property still available?",
    unread: 2,
    time: "2m",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Thanks for the tour!",
    unread: 0,
    time: "1h",
  },
  {
    id: "3",
    name: "Admin",
    lastMessage: "Your listing has been approved.",
    unread: 1,
    time: "2d",
  },
  {
    id: "4",
    name: "Michael",
    lastMessage: "Can I schedule another visit?",
    unread: 0,
    time: "3d",
  },
];

const ConversationList = () => {
  const { selectConversation } = useChatStore();

  const handleOpenConversation = (id: string) => {
    selectConversation(id);
  };

  return (
    <ScrollArea className="h-full overscroll-contain">

      <div className="space-y-1">

        {conversations.map((conversation, index) => (
          <div key={conversation.id}>

            <ConversationItem
              conversation={conversation}
              onClick={handleOpenConversation}
            />

            {index !== conversations.length - 1 && (
              <Separator />
            )}

          </div>
        ))}

      </div>

    </ScrollArea>
  );
};

export default ConversationList;