import { create } from "zustand";

interface AuthStore {
    isLoginOpen: boolean;
    isRegisterOpen: boolean;

    openLogin: () => void;
    closeLogin: () => void;

    openRegister: () => void;
    closeRegister: () => void;

    closeAll: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({

    isLoginOpen: false,
    isRegisterOpen: false,

    openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
    closeLogin: () => set({ isLoginOpen: false }),

    openRegister: () => set({ isRegisterOpen: true, isLoginOpen: false }),
    closeRegister: () => set({ isRegisterOpen: false }),

    closeAll: () => set({ isLoginOpen: false, isRegisterOpen: false }),
}))