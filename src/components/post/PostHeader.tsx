"use client";

import { Button, HoverCard, HoverCardContent, HoverCardTrigger, OptionsModal, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UserAvatar, UserInfoCard } from "@/components";
import { useOptionsModal } from "@/hooks";
import { formatTimeToNow } from "@/lib/utils";
import { ExtendedPost } from "@/types/post";
import { Lock, MoreHorizontal, Users } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";

interface PostHeaderProps {
    post: ExtendedPost;
    session: Session | null;
    deletePost: (postId: string) => Promise<void>;
}

const PostHeader: FC<PostHeaderProps> = ({
    post,
    session,
    deletePost
}) => {

    const optionsModal = useOptionsModal();

    const openModal = () => {
        optionsModal.onOpen();
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start flex-1 gap-2">
                <HoverCard>
                    <div className="relative">
                        <HoverCardTrigger>
                            <UserAvatar user={post.author} />
                        </HoverCardTrigger>
                        <HoverCardContent align="start">
                            <UserInfoCard user={session?.user!} post={post} />
                        </HoverCardContent>
                    </div>
                </HoverCard>
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-start">
                        <HoverCard>
                            <div className="relative">
                                <HoverCardTrigger asChild>
                                    <Link href={`/u/${post.author?.id}`} legacyBehavior>
                                        <span className="text-sm font-semibold cursor-pointer text-slate-900">
                                            {post.author.username ? (
                                                <span className="lowercase">
                                                    {post.author.username}
                                                </span>
                                            ) : (
                                                <span className="capitalize">
                                                    {post.author.name}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                </HoverCardTrigger>
                                <HoverCardContent align="start">
                                    <UserInfoCard user={session?.user!} post={post} />
                                </HoverCardContent>
                            </div>
                        </HoverCard>
                        <span className="mx-0.5 text-gray-500">
                            {/* • */}  ·
                        </span>
                        <span title={new Date(post?.createdAt).toString()} className="text-xs text-gray-600">
                            {formatTimeToNow(new Date(post.createdAt))}
                        </span>
                        <TooltipProvider>
                            {post?.audience === 'PUBLIC' ? (
                                <div className="flex items-center gap-x-0.5 ml-0.5">
                                    <span className="text-gray-500">
                                        ·
                                    </span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span>
                                                <Users className="w-3 h-3 text-gray-500" />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Public</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-0.5 ml-0.5">
                                    <span className="text-gray-500">
                                        ·
                                    </span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span>
                                                <Lock className="w-3 h-3 text-gray-500" />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Only Me</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            )}
                        </TooltipProvider>
                    </div>
                    <span className="text-xs text-gray-700 text-start">
                        {post.location}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <Button
                    size="xxs"
                    variant="ghost"
                    onClick={openModal}
                >
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="sr-only">Options</span>
                </Button>
            </div>
            <OptionsModal post={post} deletePost={deletePost} />
        </div>
    );
}

export default PostHeader;