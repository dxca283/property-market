"use client";

import { Message as MessageType } from "@/types/message";
import clsx from "clsx";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";

interface MessageItemProps {
  message: MessageType;
}

const MessageItem = ({
  message,
}: MessageItemProps) => {

  const isMine = message.senderId === "me";

  return (
    <Message align={isMine ? "end" : "start"}>
      <MessageContent
        className={clsx(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm break-words",
          isMine
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p>{message.content}</p>
      </MessageContent>

      <MessageFooter
        className={clsx(
          "mt-1 text-[10px]",
          isMine
            ? "text-primary-foreground/70"
            : "text-muted-foreground"
        )}
      >
        {message.createdAt}
      </MessageFooter>
    </Message>
  );
};

export default MessageItem;