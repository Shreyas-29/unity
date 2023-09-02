"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteStory = async (storyId: string) => {

    const session = await getAuthSession();

    try {

        await db.story.delete({
            where: {
                authorId: session?.user.id!,
                id: storyId! as string,
                // author: session?.user! as any,
            }
        });

    } catch (error) {
        console.log("Error creating story", error);
    }

    revalidatePath("/");
};