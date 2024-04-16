import { bookmark, deletePost, getCurrentUser, getPosts, getStories, like } from "@/actions";
import { Followbar, GeneralFeed, Sidebar } from "@/components";
import { getAuthSession } from "@/lib/auth";
import { ExtendedPost } from "@/types/post";

export default async function FeedPage() {

    const session = await getAuthSession();

    const user = await getCurrentUser();

    const posts = await getPosts();

    const stories = await getStories();

    return (
        <div className="relative flex w-full max-w-lg min-h-screen py-16 mx-auto overflow-scroll">
            <Sidebar session={session} />
            <GeneralFeed
                session={session}
                user={user}
                posts={posts as ExtendedPost[]}
                like={like}
                bookmark={bookmark}
                stories={stories!}
                deletePost={deletePost}
            />
            <Followbar />
        </div>
    )
}
