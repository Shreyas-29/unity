import type { Post, User, Bookmark, Like } from "@prisma/client";

export type ExtendedPost = Post & {
    author: User & {
        posts: Post[] & {
            likes: Like[];
            bookmarks: Bookmark[];
        };
    };
    bookmarks: Bookmark[];
    likes: Like[];
}