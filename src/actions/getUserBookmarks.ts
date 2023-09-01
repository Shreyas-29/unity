import { db } from "@/lib/db";
import { ExtendedBookmark } from "@/types/bookmark";

const getUserBookmarks = async (userId: string) => {
    try {

        const bookmarks = await db.bookmark.findMany({
            where: {
                authorId: userId
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                post: true,
            }
        });

        return bookmarks as ExtendedBookmark[];

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getUserBookmarks;