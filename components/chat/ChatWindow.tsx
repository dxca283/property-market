"use client";

import { useChatStore } from "@/store/useChatStore";
import { authClient } from "@/lib/auth-client";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import { Card } from "../ui/card";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const { isOpen, selectedConversationId } = useChatStore();
  const { data: session } = authClient.useSession();

  if (!isOpen || !session) return null;

  return (
    <Card className="fixed bottom-70 right-6 z-50 flex h-[350px] w-[360px] flex-col overflow-hidden shadow-xl">
      <ChatWindowHeader />
      <ChatWindowBody />
      {selectedConversationId && <MessageInput />}
    </Card>
  );
};

export default ChatWindow;