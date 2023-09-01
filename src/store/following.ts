import { create } from "zustand";

interface FollowingStore {
    followingIds: string[];
    setFollowingIds: (newFollowingIds: string[]) => void;
}

export const useFollowingStore = create<FollowingStore>((set) => ({
    followingIds: [],
    setFollowingIds: (newFollowingIds) => set({ followingIds: newFollowingIds }),
}));
