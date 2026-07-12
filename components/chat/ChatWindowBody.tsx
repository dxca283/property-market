"use client";

import { useChatStore } from "@/store/useChatStore";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";

const ChatWindowBody = () => {
  const { selectedConversationId } = useChatStore();

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {selectedConversationId ? (
        <MessageList />
        
      ) : (
        <ConversationList />
      )}
    </div>
  );
};

export default ChatWindowBody;