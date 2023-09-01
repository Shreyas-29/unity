import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const follow = async (userId: string) => {
    "use server";

    try {

        const session = await getAuthSession();

        if (!session?.user) {
            console.log("No user found");
            return;
        }

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            console.log("No user found");
            return;
        }

        const userFollowed = user.followersIds.includes(session.user.id);

        let updatedFollowersIds = user.followersIds.slice();

        if (userFollowed) {
            updatedFollowersIds = updatedFollowersIds.filter((id) => id !== session.user.id);
        } else {
            updatedFollowersIds.push(session.user.id);
        }

        await db.user.update({
            where: {
                id: userId
            },
            data: {
                followersIds: updatedFollowersIds
            }
        });

        return !userFollowed;

    } catch (error) {
        console.log("Error following user: ", error);
    }

    revalidatePath("/");
};