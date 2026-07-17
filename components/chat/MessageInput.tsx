"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { SendHorizontal } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useSendMessage } from "@/hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversationId } = useChatStore();
  const { mutate, isPending } = useSendMessage();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    if (!selectedConversationId) return;

    mutate({
      content: message,
      conversationId: selectedConversationId,
    });
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 border-t p-3">
      <Input
        name="message"
        label="Message"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        disabled={isPending}
      />

      <Button disabled={!message.trim() || isPending} onClick={handleSubmit}>
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;
