import { bookmark, follow, getPostById, like } from '@/actions';
import { Modal } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ExtendedPost } from '@/types/post';
import { IdPost } from '@/types/post-id';
import React from 'react';

export default async function PostPage({
    params
}: {
    params: { postId: string }
}) {

    const session = await getAuthSession();

    const post: IdPost | null = await getPostById(params?.postId);

    return (
        <Modal
            post={post!}
            session={session}
            like={like}
            bookmark={bookmark}
            follow={follow}
        />
    )
};