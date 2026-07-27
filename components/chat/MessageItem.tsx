"use client";

import { Message as MessageType } from "@/types/message";
import clsx from "clsx";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "../ui/bubble";

interface MessageItemProps {
  message: MessageType;
  isMine: boolean;
}

const MessageItem = ({ message, isMine }: MessageItemProps) => {
  return (
    <Message align={isMine ? "end" : "start"}>
      <MessageContent>
        <Bubble variant={isMine ? "default" : "muted"}>
          <BubbleContent>{message.content}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
};

export default MessageItem;
