"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/message";
import MessageItem from "./MessageItem";

const messages: Message[] = [
  {
    id: "1",
    senderId: "other",
    content: "Hello 👋",
    createdAt: "10:00",
  },
  {
    id: "2",
    senderId: "me",
    content: "Hi!",
    createdAt: "10:01",
  },
  {
    id: "3",
    senderId: "other",
    content: "Is this apartment still available?",
    createdAt: "10:02",
  },
  {
    id: "4",
    senderId: "me",
    content: "Yes, it is available.",
    createdAt: "10:03",
  },
  {
    id: "5",
    senderId: "other",
    content: "Great! Can I visit tomorrow?",
    createdAt: "10:04",
  },
];

const MessageList = () => {
  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="flex flex-col gap-3 p-4">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;