import { ExtendedPost } from "@/types/post";
import { Session } from "next-auth";
import { FC } from "react";
import { PostActions, PostComment, PostHeader, PostImage } from "..";

interface PostProps {
    post: ExtendedPost;
    session: Session | null;
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
    deletePost: (postId: string) => Promise<void>;
}

const Post: FC<PostProps> = ({
    session,
    post,
    like,
    bookmark,
    deletePost
}) => {

    return (
        <div className="flex flex-col items-center justify-center relative bg-white shadow-sm border border-gray-50 rounded-2xl px-2.5 py-3 select-none w-full">
            <PostHeader post={post} session={session} deletePost={deletePost} />
            <PostImage post={post} />
            <PostActions post={post} session={session} like={like} bookmark={bookmark} />
            <PostComment post={post} session={session} />
        </div>
    );
}

export default Post;