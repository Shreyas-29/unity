import type { Post, Like, Bookmark } from "@prisma/client";

export type ExtendedBookmark = Bookmark & {
    post: Post & {
        bookmarks: Bookmark[];
        likes: Like[];
    }
}
