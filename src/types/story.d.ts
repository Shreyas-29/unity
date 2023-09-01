import type { Story, User, Bookmark, Like } from "@prisma/client";

export type ExtendedStory = Story & {
    author: User;
}