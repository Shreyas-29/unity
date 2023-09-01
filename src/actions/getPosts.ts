import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ExtendedPost } from "@/types/post";

const getPosts = async () => {
    try {

        const session = await getAuthSession();

        const posts = await db.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                OR: [
                    {
                        audience: "PUBLIC"
                    },
                    {
                        authorId: session?.user?.id
                    }
                ]
            },
            include: {
                author: {
                    include: {
                        posts: true,
                    }
                },
                likes: true,
                bookmarks: true,
            },
        });

        return posts as ExtendedPost[];
    } catch (error) {
        console.log("Unable to fetch posts", error);
        return [];
    }
};

export default getPosts;