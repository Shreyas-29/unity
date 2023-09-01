import { create } from "zustand";

interface CreatePostModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useCreatePostModal = create<CreatePostModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
