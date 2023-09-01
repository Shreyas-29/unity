import { create } from "zustand";

interface OptionsModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useOptionsModal = create<OptionsModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));