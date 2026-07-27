"use client";
import { useChatStore } from "@/store/useChatStore";
import { MessageCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/useAuthStore";

const ChatBubble = () => {
  const { toggleChat} = useChatStore();
  const { data: session } = authClient.useSession();
  const loginModal = useAuthStore();
  const handleClick = () => {
    if (!session) {
      loginModal.openLogin();
      return;
    } else {
      toggleChat();
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

    </>
  );
};

export default ChatBubble;
