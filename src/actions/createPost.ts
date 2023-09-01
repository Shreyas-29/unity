import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Audience } from "@prisma/client";

export const createPost = async (postData: FormData) => {
    "use server";

    const session = await getAuthSession();

    const content = postData.get("content");
    const location = postData.get("location");
    const image = postData.get("image");
    const audience = postData.get("audience");

    try {
        await db.post.create({
            data: {
                content: content as string,
                location: location as string,
                image: image as string,
                audience: audience as Audience || "PUBLIC",
                authorId: session?.user.id! as string,
            }
        });
    } catch (error) {
        console.log("Error creating post", error);
    }

    revalidatePath("/");
};

// import { db } from '@/lib/db';
// import { revalidatePath } from 'next/cache';
// import { getCurrentUser } from '.';

// export const createPost = async (postData: FormData) => {

//     // const user = await getCurrentUser();

//     const content = postData.get("content");
//     const image = "https://image.lexica.art/full_jpg/822ef249-d7fe-4a1e-b3a4-76486b60233b";
//     const location = postData.get("location");
//     const audience = "PUBLIC";

//     try {
//         await db.post.create({
//             data: {
//                 content: content as string,
//                 image: image,
//                 location: location as string,
//                 audience: audience,
//                 authorId: Math.random().toString() as string,
//             }
//         });
//     } catch (error) {
//         console.log("Error creating post: ", error);
//     }

//     revalidatePath("/");
// };
