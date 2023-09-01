import { db } from "@/lib/db";
import { ExtendedPost } from "@/types/post";

const getUserPosts = async (userId: string) => {
    try {

        const posts = await db.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: {
                    include: {
                        posts: true
                    }
                },
                likes: true,
                bookmarks: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return posts as ExtendedPost[];

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getUserPosts;