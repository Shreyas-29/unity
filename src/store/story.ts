import { create } from "zustand";

interface StoryStore {
    caption: string;
    setCaption: (input: string) => void;
}

export const useStoryStore = create<StoryStore>((set) => ({
    caption: "",
    setCaption: (input: string) => set({ caption: input }),
}));