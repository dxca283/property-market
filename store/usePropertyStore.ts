import { create } from "zustand";

interface CreatePropertyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreatePropertyModal = create<CreatePropertyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreatePropertyModal;
