"use client";

import { useCustomToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/post";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, experimental_useOptimistic as useOptimistic, useState } from "react";
import { Button, PostButtons } from "..";

interface PostActionsProps {
    post: ExtendedPost;
    session: Session | null;
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
}

interface Particle {
    x: number;
    y: number;
}

const PostActions: FC<PostActionsProps> = ({
    post,
    like,
    session,
    bookmark
}) => {

    const [showFullContent, setShowFullContent] = useState<boolean>(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };


    return (
        <div className="relative flex flex-col items-center justify-between w-full mb-2 overflow-visible">
            <PostButtons
                post={post}
                session={session}
                like={like}
                bookmark={bookmark}
            />
            <div className="flex flex-col items-center justify-start w-full mt-2">
                <div className="w-full cursor-pointer">
                    <div className={cn(
                        "flex items-center justify-start w-full cursor-pointer",
                        showFullContent && "flex-col text-start items-start"
                    )}>
                        <span className="mr-1 text-sm font-bold text-slate-800 min-w-max">
                            {post?.author.username || post?.author?.name}
                        </span>
                        {post.content && (
                            <div className="text-sm text-neutral-800">
                                {showFullContent
                                    ? <p className="whitespace-pre-line">
                                        {post?.content}
                                    </p>
                                    :
                                    <p className="flex-wrap">
                                        {post?.content.slice(0, 20)}
                                        {post?.content.length > 20 && "..."}
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center w-full text-start">
                    {post?.content.length > 20 && (
                        <Button
                            size="sm"
                            variant="link"
                            onClick={toggleContent}
                            className={cn("text-slate-500 font-normal no-underline -ml-2", showFullContent && "hidden")}
                        >
                            {showFullContent ? '...less' : 'more'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostActions;