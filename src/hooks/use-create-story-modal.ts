import { create } from "zustand";

interface CreateStoryModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useCreateStoryModal = create<CreateStoryModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
