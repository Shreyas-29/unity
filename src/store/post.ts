import { create } from "zustand";

interface PostStore {
    postText: string;
    setPostText: (input: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    postText: "",
    setPostText: (input: string) => set({ postText: input }),
}));