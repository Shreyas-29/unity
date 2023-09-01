import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// export const like = async (postId: string) => {
//     "use server";

//     const session = await getAuthSession();

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

//         const userLiked = post.likeIds.includes(session?.user.id!);
//         let updatedLikeIds = post.likeIds.slice();
//         // const liked = post.likeIds.includes(session?.user.id!);

//         if (userLiked) {
//             updatedLikeIds = updatedLikeIds.filter((id) => id !== session?.user.id!);
//         } else {
//             updatedLikeIds.push(session?.user.id!);
//         }

//         await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 likeIds: updatedLikeIds
//             }
//         });

//         return !userLiked;

//     } catch (error) {
//         console.log("Error updating post: ", error);
//     }

//     revalidatePath("/");
// };