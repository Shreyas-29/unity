import { bookmark, deletePost, getCurrentUser, getPosts, getStories, like } from "@/actions";
import { Followbar, GeneralFeed, Loader, Sidebar } from "@/components";
import { getAuthSession } from "@/lib/auth";
import { ExtendedPost } from "@/types/post";

export default async function FeedPage() {

    const session = await getAuthSession();

    const user = await getCurrentUser();

    const posts = await getPosts();

    const stories = await getStories();

    // Ok, now the current user id is getting added into the post author followers ids, but now how do i get the id's of the other users which the current logged in user is following

    // const createPost = async (postData: FormData) => {
    //     "use server";

    //     const content = postData.get("content");
    //     const location = postData.get("location");
    //     const image = postData.get("image");
    //     const audience = postData.get("audience");

    //     try {
    //         await db.post.create({
    //             data: {
    //                 content: content as string,
    //                 location: location as string,
    //                 image: image as string,
    //                 audience: "PUBLIC",
    //                 authorId: session?.user?.id as string,
    //             }
    //         });
    //     } catch (error) {
    //         console.log("Error creating post", error);
    //     }

    //     revalidatePath("/");
    // };

    return (
        // <div className="relative flex w-full max-w-lg min-h-screen py-16 mx-auto overflow-scroll">
        //     {/* <Sidebar session={session} />
        //     <GeneralFeed
        //         session={session}
        //         user={user}
        //         posts={posts as ExtendedPost[]}
        //         like={like}
        //         bookmark={bookmark}
        //         stories={stories}
        //         deletePost={deletePost}
        //     />
        //     <Followbar /> */}
        // </div>
        <Loader />
    )
}
