import type { Post, User, Bookmark, Like } from "@prisma/client";

export type IdPost = Post & {
    author: User & {
        posts: Post[] & {
            likes: Like[];
            bookmarks: Bookmark[];
        };
    };
    bookmarks: Array<Bookmark & {
        author: User;
    }>;
    likes: Array<Like & {
        author: User;
    }>;
};