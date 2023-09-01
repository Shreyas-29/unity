import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createStory = async (postData: FormData) => {
    "use server";

    const session = await getAuthSession();

    const content = postData.get("content");
    const image = postData.get("image");

    try {

        await db.story.create({
            data: {
                content: content as string,
                image: image as string,
                authorId: session?.user.id! as string,
            }
        });

    } catch (error) {
        console.log("Error creating story", error);
    }

    revalidatePath("/");
};