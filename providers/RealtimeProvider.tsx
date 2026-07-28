"use client";

import { useRealtimeConversations } from "@/hooks/useRealtimeConversations";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";

export default function RealtimeProvider() {
  useRealtimeConversations();

  useRealtimeNotifications();

  return null;
}
