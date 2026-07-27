import { create } from "zustand";

interface ChatStore {
  isOpen: boolean;
  selectedConversationId: string | null;
  isContactModalOpen: boolean;
  pendingProperty: {
    propertyId: string;
    seller: {
      name: string;
      image?: string | null;
    };
  } | null;

  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;

  selectConversation: (id: string) => void;
  backToList: () => void;
  openContactModal: (payload: {
    propertyId: string;
    seller: {
      name: string;
      image?: string | null;
    };
  }) => void;

  closeContactModal: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  selectedConversationId: null,
  isContactModalOpen: false,
  pendingProperty: null,

  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  selectConversation: (id: string) =>
    set({ selectedConversationId: id, isOpen: true }),
  backToList: () => set({ selectedConversationId: null }),
  openContactModal: (payload) =>
    set({
      isContactModalOpen: true,
      pendingProperty: payload,
    }),

  closeContactModal: () =>
    set({
      isContactModalOpen: false,
      pendingProperty: null,
    }),
}));
