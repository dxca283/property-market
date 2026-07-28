"use client";

import { useChatStore } from "@/store/useChatStore";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { useSocket } from "@/hooks/useSocket";

export default function ConversationRealtime() {
  const { selectedConversationId } = useChatStore();

  useSocket(selectedConversationId);

  useRealtimeMessages(selectedConversationId);

  return null;
}