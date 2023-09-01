import { db } from "@/lib/db";
import { ExtendedUser } from "@/types/user";

const getParamsUser = async (userId: string) => {
    try {

        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                posts: {
                    include: {
                        likes: true,
                        bookmarks: true,
                    }
                },
                likes: true,
                bookmarks: true,
                story: true,
                comments: true,
                profile: true,
            }
        });

        return user as ExtendedUser;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getParamsUser;