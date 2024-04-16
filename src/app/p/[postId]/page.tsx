import { bookmark, deletePost, follow, getPostById, like } from "@/actions";
import { Modal, PostContent, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { IdPost } from "@/types/post-id";

export default async function PostPage({
    params
}: {
    params: { postId: string }
}) {

    const session = await getAuthSession();

    const post: IdPost | null = await getPostById(params?.postId);

    return (
        <PostContent
            post={post!}
            session={session}
            like={like}
            bookmark={bookmark}
            follow={follow}
            deletePost={deletePost}
        />
    );
};
