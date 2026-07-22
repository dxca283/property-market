"use client";

import { useRef, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { SendHorizontal } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useSendMessage } from "@/hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversationId } = useChatStore();
  const { mutate, isPending } = useSendMessage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;
    if (!selectedConversationId) return;

    mutate({
      content: message,
      conversationId: selectedConversationId,
    });

    setMessage("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-3"
    >
      <Input
        ref={inputRef}
        name="message"
        label="Message"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />

      <Button type="submit" disabled={!message.trim() || isPending}>
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default MessageInput;
