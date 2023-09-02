"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {

    const session = await getAuthSession();

    try {

        await db.post.delete({
            where: {
                id: postId,
                authorId: session?.user.id!,
            }
        });

    } catch (error) {
        console.log("Error creating story", error);
    }

    revalidatePath("/");
};