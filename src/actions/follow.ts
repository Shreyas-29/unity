"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const follow = async (userId: string) => {

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

        const userFollowed = user?.followersIds?.includes(userId);

        if (userFollowed) {
            console.log("User already followed");
            return;
        }

        let updatedFollowingIds = session?.user.followingIds?.slice();

        let updatedFollowersIds = user.followersIds.slice();

        if (!userFollowed) {
            updatedFollowingIds?.push(userId);
            updatedFollowersIds?.push(session.user.id!);
        }

        await db.user.update({
            where: {
                id: userId
            },
            data: {
                followersIds: updatedFollowersIds
            }
        });

        await db.user.update({
            where: {
                id: session?.user.id!
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return !userFollowed;

    } catch (error) {
        console.log("Error following user: ", error);
    }

    revalidatePath("/");
};