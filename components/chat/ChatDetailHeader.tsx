"use client";

import { ArrowLeft, X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

const ChatDetailHeader = () => {
  const {
    backToList,
    closeChat,
  } = useChatStore();

  return (
    <div className="flex h-14 items-center justify-between border-b px-4">

      <div className="flex items-center gap-2">

        <button
          onClick={backToList}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>

          <p className="font-medium">
            John Doe
          </p>

          <p className="text-xs text-muted-foreground">
            Online
          </p>

        </div>

      </div>

      <button
        onClick={closeChat}
        className="p-2 hover:bg-black/5 rounded-full transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

    </div>
  );
};

export default ChatDetailHeader;