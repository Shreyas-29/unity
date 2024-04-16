import { create } from "zustand";

interface SearchModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSearchModal = create<SearchModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
