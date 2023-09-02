"use client";

import { Button, HoverCard, HoverCardContent, HoverCardTrigger, Input, OptionsModal, PostButtons, UserAvatar, UserInfoCard } from "@/components";
import { toast, useCustomToast, useOptionsModal } from "@/hooks";
import { formatTimeToNow } from "@/lib/utils";
import { IdPost } from "@/types/post-id";
import { MoreHorizontal } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation"; import { FC, experimental_useOptimistic as useOptimistic, useState } from "react";

interface ModalContentProps {
    post: IdPost;
    session: Session | null;
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
    follow: (userId: string) => Promise<boolean | void>;
}

const PostContent: FC<ModalContentProps> = ({
    post,
    session,
    like,
    bookmark,
    follow
}) => {

    const router = useRouter();

    const { authToast } = useCustomToast();

    const optionsModal = useOptionsModal();

    const isFollowed = post?.author?.followersIds?.includes(session?.user.id!) ?? false;

    const followedIds = post?.author?.followersIds || [];

    const [optimisticFollowedIds, updateOptimisticFollowedIds] = useOptimistic(followedIds,
        (state, newFollowedId: string) => {
            return [...state, newFollowedId];
        }
    );

    const [followed, setFollowed] = useState<boolean>(optimisticFollowedIds?.includes(session?.user.id!) ?? false);
    const [disabledFollow, setDisabledFollow] = useState<boolean>(false);

    const openModal = () => {
        optionsModal.onOpen();
    };

    const handleFollow = async () => {
        try {

            if (!session?.user) {
                return authToast();
            }

            if (disabledFollow) {
                toast({
                    title: "Slow down!",
                    description: "You're adding following too fast.",
                    variant: "destructive"
                });
                return;
            }

            setDisabledFollow(true);

            updateOptimisticFollowedIds(session?.user.id!);

            const res = await follow(post?.author?.id);

            if (res === true) {
                setFollowed(true);
            } else {
                setFollowed(false);
            }
        } catch (error) {
            console.log("Error while follwing: ", error);
            toast({
                title: 'Something went wrong.',
                description: 'Your follower was not followed. Please try again.',
                variant: 'destructive',
            })
        } finally {
            router.refresh();
            setTimeout(() => {
                setDisabledFollow(false);
            }, 1000);
        }
    };


    return (
        <div className="grid grid-cols-12 w-full min-h-[550px] gap-4">
            <div className="w-full col-span-7 flex items-center relative max-h-[550px] overflow-hidden">
                <div className="flex items-center justify-center w-full h-full rounded-xl">
                    {post?.image ? (
                        <Image
                            src={post?.image}
                            alt={post?.id.charAt(0).toUpperCase() + post?.id.slice(1)}
                            width={500}
                            height={500}
                            unoptimized
                            className="object-cover w-full h-full rounded-xl"
                        />
                    ) : null}
                </div>
            </div>
            <div className="relative flex flex-col items-start w-full h-full max-h-[550px] overflow-scroll col-span-5">
                <div className="sticky inset-x-0 top-0 flex items-center justify-between w-full pt-1 pb-2 border-b border-gray-100">
                    <div className="flex items-center flex-1 gap-3">
                        <Image src={post?.author?.image!} alt="" width={50} height={50} unoptimized className='rounded-full w-7 h-7' />
                        <span className="font-bold text-gray-900">
                            {post.author.username || post.author.name}
                        </span>
                        {session?.user.id === post?.author.id ? null : (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleFollow}
                            >
                                {followed ? "Unfollow" : "Follow"}
                            </Button>
                        )}
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
                    {/* <OptionsModal post={post} /> */}
                </div>
                <div className="items-start hidden w-full h-[calc(100%-100px)] py-3 overflow-y-scroll lg:flex lg:flex-col border-b border-gray-100">
                    <div className="flex items-start w-full">
                        <div className="flex items-center justify-start w-8 h-8">
                            <Image src={post?.author?.image!} alt="" width={50} height={50} unoptimized className='rounded-full w-7 h-7' />
                        </div>
                        <div className="flex flex-col items-start justify-start w-full gap-1 ml-3">
                            <span className="text-sm font-bold text-gray-900 text-start">
                                {post?.author.username || post.author.name}
                            </span>
                            <p className="max-w-full text-sm whitespace-pre-line text-neutral-700">
                                {post.content && post.content}
                            </p>
                            <span className="pt-4 text-xs text-gray-500 text-start">
                                {formatTimeToNow(new Date(post.createdAt))}
                            </span>
                        </div>
                    </div>
                    {/* Comments */}
                    <div className="flex flex-col items-start w-full py-4 gap-y-4">
                        <div className="flex items-start justify-between w-full">
                            <div className="flex items-start flex-1 gap-4">
                                <div className="flex items-center justify-start z-0">
                                    <UserAvatar user={post.author!} />
                                </div>
                                <div className="flex flex-col items-start gap-y-0.5">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {post?.author?.username || post?.author?.name}
                                    </span>
                                    <div className="flex items-start gap-1">
                                        <span className="text-xs font-light">
                                            {formatTimeToNow(new Date(post?.createdAt))}
                                        </span>
                                        <button className="px-1 text-xs font-medium text-gray-700 no-underline transition hover:text-gray-600">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <Button variant="action" size="xxxs">
                                    <Image src="/svg/heart.svg" alt="" width={50} height={50} className='w-4 h-4 text-slate-700' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky inset-x-0 bottom-0 flex items-center justify-start w-full pt-2 border-t border-gray-100">
                    <div className="flex flex-col items-center w-full">
                        <PostButtons
                            post={post}
                            session={session}
                            like={like}
                            bookmark={bookmark}
                        />
                        <div className="relative flex items-center justify-center w-full py-2">
                            <div className="flex-1 w-full mr-1 -ml-1">
                                <Input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="w-full border-none focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none h-9 !px-2 rounded-none"
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <Button variant="ghost" size="sm" className="font-semibold no-underline hover:bg-muted">
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostContent;