import { create } from "zustand";

interface ChatStore {
  isOpen: boolean;
  selectedConversationId: string | null;

  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;

  selectConversation: (id: string) => void;
  backToList: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  selectedConversationId: null,

  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  selectConversation: (id: string) =>
    set({ selectedConversationId: id, isOpen: true }),
  backToList: () => set({ selectedConversationId: null }),
}));
