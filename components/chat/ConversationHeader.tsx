"use client";

import { X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

const ConversationHeader = () => {
  const { closeChat } = useChatStore();

  return (
    <div className="flex h-15 items-center justify-between border-b px-4">

      <h2 className="font-semibold text-lg">
        Messages
      </h2>

      <button
        onClick={closeChat}
        className="p-2 hover:bg-black/5 rounded-full transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

    </div>
  );
};

export default ConversationHeader;