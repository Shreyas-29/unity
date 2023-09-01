"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// export const bookmark = async (postId: string, userId: string) => {
//     "use server";

//     // const session = await getAuthSession();

//     try {

//         const post = await db.post.findUnique({
//             where: {
//                 id: postId
//             },
//         });

//         if (!post) {
//             console.log("Could not found post");
//             return;
//         }

//         const userBookmarked = post.bookmarkIds.includes(userId);
//         let updatedBookmarkIds = post.bookmarkIds.slice();

//         if (userBookmarked) {
//             updatedBookmarkIds = updatedBookmarkIds.filter((id) => id !== userId);
//         } else {
//             updatedBookmarkIds.push(userId);
//         }

//         await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 bookmarkIds: updatedBookmarkIds
//             }
//         });

//         return !userBookmarked;

//     } catch (error) {
//         console.log("Error adding bookmark: ", error);
//     }

//     revalidatePath("/");
// };

// export const bookmark = async (postId: string, userId: string | null) => {
//     "use server";

//     try {

//         const post = await db.post.findUnique({
//             where: {
//                 id: postId
//             },
//         });

//         if (!post) {
//             console.log("Could not find post");
//             return;
//         }

//         const userBookmarked = post.bookmarkIds.includes(userId!);
//         let updatedBookmarkIds = post.bookmarkIds.slice();

//         if (userBookmarked) {
//             updatedBookmarkIds = updatedBookmarkIds.filter((id) => id !== userId!);
//         } else {
//             updatedBookmarkIds.push(userId!);
//         }

//         await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 bookmarkIds: updatedBookmarkIds
//             }
//         });

//         return !userBookmarked;
//     } catch (error) {
//         console.log("Error adding bookmark: ", error);
//     }
//     revalidatePath("/");
// };


export const bookmark = async (postId: string, userId: string) => {

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

        const bookmark = await db.bookmark.findFirst({
            where: {
                postId: postId,
                authorId: userId
            }
        });

        if (bookmark) {
            await db.bookmark.delete({
                where: {
                    id: bookmark.id
                }
            });
            return false;
        } else {
            await db.bookmark.create({
                data: {
                    postId: postId,
                    authorId: userId
                }
            });
            return true;
        }

    } catch (error) {
        console.log("Error adding bookmark: ", error);
    }

    revalidatePath("/");
};