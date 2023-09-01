import { db } from "@/lib/db";
import { IdPost } from "@/types/post-id";

const getPostById = async (postId: string) => {
    try {

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                likes: true,
                bookmarks: true,
            }
        });

        return post as IdPost;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getPostById;