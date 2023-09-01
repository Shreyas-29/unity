import { create } from "zustand";

interface AlertModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAlertModal = create<AlertModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));