import { create } from "zustand";

type RTLStore = {
    isRTL: boolean;
    toggleRTL: () => void;
};

export const useRTL = create<RTLStore>((set) => ({
    isRTL: false,
    toggleRTL: () => set((state) => ({ isRTL: !state.isRTL })),
}));