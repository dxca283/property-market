import { create } from 'zustand';

interface AdminPropertyStore {
  isOpen: boolean;
  selectedPropertyId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useAdminPropertyStore = create<AdminPropertyStore>((set) => ({
  isOpen: false,
  selectedPropertyId: null,
  onOpen: (id) => set({ isOpen: true, selectedPropertyId: id }),
  onClose: () => set({ isOpen: false, selectedPropertyId: null }),
}));
