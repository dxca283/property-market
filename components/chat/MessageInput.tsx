"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { SendHorizontal } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-3"
    >
      <Input
        name="message"
        label="Message"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />

      <Button
        type="submit"
        disabled={!message.trim()}
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default MessageInput;