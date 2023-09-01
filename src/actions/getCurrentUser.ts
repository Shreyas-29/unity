import { db } from "@/lib/db";
import getSession from "./getSession";
import { ExtendedUser } from "@/types/user";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email
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

        return currentUser as ExtendedUser;

    } catch (error) {
        return null;
    }
};

export default getCurrentUser;