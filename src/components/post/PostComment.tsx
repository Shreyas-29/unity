"use client";

import { ExtendedPost } from "@/types/post";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Button, Input, UserAvatar } from "..";

interface PostCommentProps {
    post: ExtendedPost;
    session: Session | null;
}

const PostComment: FC<PostCommentProps> = ({
    post,
    session
}) => {
    return (
        <div className="flex flex-col items-start flex-1 w-full">
            <div className="flex items-center justify-start w-full">
                <div className="text-sm font-medium text-gray-500">
                    <Link href={`/p/${post.id}`}>
                        <Button variant="link" size="sm" className="px-0 font-medium text-gray-600 no-underline hover:no-underline hover:text-gray-800">
                            View all 2 comments
                        </Button>
                    </Link>
                </div>
            </div>
            {session?.user ? (
                <div className="flex items-center justify-center w-full mt-1">
                    <div className="flex items-start">
                        <UserAvatar user={session?.user!} />
                    </div>
                    <div className="flex-1 w-full mx-1">
                        <Input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full border-none focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none h-9"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm" className="font-semibold no-underline hover:bg-muted">
                            Post
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default PostComment;