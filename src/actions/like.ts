"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const like = async (postId: string, userId: string) => {

    try {

        const post = await db.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            console.log("Could not find post");
            return;
        }

        const like = await db.like.findFirst({
            where: {
                postId: postId,
                authorId: userId
            }
        });

        if (like) {
            await db.like.delete({
                where: {
                    id: like.id
                }
            });
            return false;
        } else {
            await db.like.create({
                data: {
                    postId: postId,
                    authorId: userId
                }
            });
            return true;
        }

    } catch (error) {
        console.log("Error adding like: ", error);
    }

    revalidatePath("/");
};


// export const like = async (postId: string, userId: string) => {
//     "use server";

//     try {

//         const post = await db.post.findUnique({
//             where: {
//                 id: postId
//             },
//         });

//         console.log("post", post);

//         if (!post) {
//             console.log("Could not found post");
//             return;
//         }

//         const like = await db.like.findFirst({
//             where: {
//                 postId: postId,
//                 authorId: userId
//             }
//         });

//         console.log("Like: ", like);

//         if (like) {
//             await db.like.delete({
//                 where: {
//                     id: like.id
//                 }
//             });
//             return false;
//         } else {
//             await db.like.create({
//                 data: {
//                     postId: postId,
//                     authorId: userId!
//                 }
//             });
//             return true;
//         }

//     } catch (error) {
//         console.log("Error updating post: ", error);
//     }

//     revalidatePath("/");
// };
