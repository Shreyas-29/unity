import { create } from "zustand";

interface StoryModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoryModal = create<StoryModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
