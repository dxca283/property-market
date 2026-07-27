"use client";

import { useChatStore } from "@/store/useChatStore";
import ConversationHeader from "./ConversationHeader";
import ChatDetailHeader from "./ChatDetailHeader";

const ChatWindowHeader = () => {
  const { selectedConversationId } = useChatStore();

  if (selectedConversationId) {
    return <ChatDetailHeader />;
  }

  return <ConversationHeader />;
};

export default ChatWindowHeader;