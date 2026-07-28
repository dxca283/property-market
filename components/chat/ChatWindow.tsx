"use client";

import { useChatStore } from "@/store/useChatStore";
import { authClient } from "@/lib/auth-client";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import { Card } from "../ui/card";
import MessageInput from "./MessageInput";
import ConversationRealtime from "@/providers/ConversationRealtime";

const ChatWindow = () => {
  const { isOpen, selectedConversationId } = useChatStore();
  const { data: session } = authClient.useSession();

  if (!isOpen || !session) return null;

  return (
    <>
      <ConversationRealtime />
      <Card className="fixed bottom-70 right-6 z-50 flex h-87.5 w-90 flex-col overflow-hidden shadow-xl">
        <ChatWindowHeader />
        <ChatWindowBody />
        {selectedConversationId && <MessageInput />}
      </Card>
    </>
  );
};

export default ChatWindow;
