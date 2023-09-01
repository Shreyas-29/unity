"use client";

import { toast, useCustomToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/post";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, experimental_useOptimistic as useOptimistic, useState } from "react";
import { Button } from "..";
import { buttonVariants } from "../ui/Button";

interface PostButtonsProps {
    post: ExtendedPost;
    session: Session | null;
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
}

interface Particle {
    x: number;
    y: number;
}

const PostButtons: FC<PostButtonsProps> = ({
    post,
    session,
    like,
    bookmark
}) => {

    const router = useRouter();

    const { authToast } = useCustomToast();

    const likeIds = post.likes?.map((like) => like.authorId) || [];

    const [optimisticLikeIds, updateOptimisticLikeIds] = useOptimistic(likeIds,
        (state, newLikeId: string) => {
            return [...state, newLikeId];
        }
    );

    // console.log("optimisticLikeIds: ", optimisticLikeIds, likeIds);

    const bookmarkIds = post.bookmarks?.map((bookmark) => bookmark.authorId) || [];

    const [optimisticBookmarkIds, updateOptimisticBookmarkIds] = useOptimistic(bookmarkIds,
        (state, newBookmarkId: string) => {
            return [...state, newBookmarkId];
        }
    );

    const [liked, setLiked] = useState<boolean>(optimisticLikeIds.includes(session?.user.id!));
    const [bookmarked, setBookmarked] = useState(optimisticBookmarkIds.includes(session?.user.id!));
    const [showFullContent, setShowFullContent] = useState<boolean>(false);
    const [disableLike, setDisableLike] = useState<boolean>(false);
    const [disabledBookmark, setDisabledBookmark] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const handleBookmarkPage = () => {
        router.push(`/u/${session?.user?.id}?tab=bookmarks`);
        router.refresh();
    };

    const showParticles = (res: boolean | null) => {
        if (res = true) {
            const newParticles: Particle[] = Array.from({ length: 50 }).map(() => ({
                x: Math.random() * 200,
                y: Math.random() * 200,
            }));

            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
            }, 2500);
        } else {
            setParticles([]);
        }
    };

    const handleBookmark = async (postId: string) => {
        try {

            if (!session?.user) {
                return authToast();
            }

            if (disabledBookmark) {
                toast({
                    title: "Slow down!",
                    description: "You're adding bookmark too fast.",
                    variant: "destructive"
                });
                return;
            }

            setDisabledBookmark(true);

            // updateOptimisticBookmarkIds((prev) => [...prev, postId]);
            updateOptimisticBookmarkIds(session?.user.id!);
            // console.log("oBookmarks", updateOptimisticBookmarkIds(session?.user.id!));

            const res = await bookmark(postId, session?.user.id);

            if (res === true) {
                setBookmarked(true);
                localStorage.setItem(`post_${postId}`, "bookmark");
                toast({
                    title: "Post saved!",
                    description: "You can view saved posts in your profile",
                    action: (
                        <Link
                            href={`/u/${session?.user?.id}?tab=bookmarks`}
                            className={buttonVariants({ variant: 'outline', size: "md", className: "text-slate-700 -ml-3" })}
                        >
                            <span className="w-full text-xs text-slate-700">
                                View
                            </span>
                        </Link>
                    )
                });
            } else {
                setBookmarked(false);
                localStorage.removeItem(`post_${postId}`);
            }
        } catch (error) {
            console.log("Error while handling bookmark: ", error);
            toast({
                title: 'Something went wrong.',
                description: 'Your post was not saved. Please try again.',
                variant: 'destructive',
            })
        } finally {
            router.refresh();
            setTimeout(() => {
                setDisabledBookmark(false);
                // updateOptimisticBookmarkIds(session?.user.id!);
            }, 1000);
        }
    };

    const handleLike = async (postId: string) => {
        try {

            if (!session?.user) {
                return authToast();
            }

            if (disabledBookmark) {
                toast({
                    title: "Slow down!",
                    description: "You're adding bookmark too fast.",
                    variant: "destructive"
                });
                return;
            }

            setDisableLike(true);

            // updateOptimisticBookmarkIds((prev) => [...prev, postId]);
            updateOptimisticLikeIds(session?.user.id!);
            // console.log("oLikes", updateOptimisticLikeIds(session?.user.id!));

            const res = await like(postId, session?.user.id);

            if (res === true) {
                setLiked(true);
                showParticles(res);
                // localStorage.setItem(`post_${postId}`, "like");
            } else {
                setLiked(false);
                // localStorage.removeItem(`post_${postId}`);
            }
        } catch (error) {
            console.log("Error while handling like: ", error);
            toast({
                title: 'Something went wrong.',
                description: 'Your post was not saved. Please try again.',
                variant: 'destructive',
            })
        } finally {
            router.refresh();
            setTimeout(() => {
                setDisableLike(false);
                // updateOptimisticBookmarkIds(session?.user.id!);
            }, 1000);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center w-full overflow-visible">
            <div className="flex items-center justify-between w-full">
                <div className="relative flex items-center justify-start flex-1 gap-2 overflow-hidden">
                    <Button
                        size="xxs"
                        variant="action"
                        title={liked ? "Unlike" : "Like"}
                        // onClick={handleLikeClick}
                        onClick={() => handleLike(post.id)}
                        className="relative overflow-hidden transition-colors text-slate-800 hover:text-slate-400 active:scale-100"
                    >
                        <motion.span whileTap={{ scale: 1.2 }}>
                            <motion.span
                                initial={false}
                                animate={{ scale: liked ? 1.2 : 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <Image
                                    src={liked ? "/svg/heart-fill.svg" : "/svg/heart.svg"}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className={cn("w-5 h-5",
                                        // liked ? "scale-110 transition-transform duration-200 ease-in-out" : "heart-pulse"
                                    )}
                                />
                            </motion.span>
                        </motion.span>
                        {particles.map((particle, index) => (
                            <motion.div
                                key={index}
                                className="confetti-particle z-[1000]"
                                initial={{ opacity: 1, scale: 0 }}
                                animate={{
                                    y: [0, -100],
                                    opacity: [1, 0],
                                    scale: [0, 1],
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    delay: Math.random(),
                                }}
                                style={{
                                    position: "absolute",
                                    top: `${particle.y}%`,
                                    left: `${particle.x}%`,
                                    backgroundColor: "#ef4444",
                                    // backgroundColor: "rgba(255, 0, 0, 0.8)",
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                }}
                            />
                        ))}
                    </Button>
                    <Button title="Share" variant="action" size="xxs" className="transition-colors text-slate-800 hover:text-slate-400">
                        <Image src="/svg/send.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                    </Button>
                    <Link href={`/p/${post.id}`}>
                        <Button title="Comments" variant="action" size="xxs" className="transition-colors text-slate-800 hover:text-slate-400">
                            <Image src="/svg/chat.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center justify-end">
                    <Button
                        size="xxs"
                        variant="action"
                        title={bookmarked ? "Remove bookmark" : "Bookmark"}
                        onClick={() => handleBookmark(post.id)}>
                        {bookmarked ? (
                            <Image src="/svg/bookmark-fill.svg" alt="" width={50} height={50} className='w-5 h-5' />
                        ) : (
                            <Image src="/svg/bookmark.svg" alt="" width={50} height={50} className='w-5 h-5' />
                        )}
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-start w-full my-1">
                {post?.likes?.length > 0 ? (
                    <Link href={`/p/${post.id}`}>
                        <Button
                            size="sm"
                            variant="action"
                            title="Likes"
                            className="flex items-center justify-start text-slate-800 hover:text-slate-500"
                        >
                            {post?.likes?.length} {" "} {post?.likes?.length === 1 ? "like" : "likes"}
                        </Button>
                    </Link>
                ) : (
                    <div className="flex items-center w-full">
                        <p className="mr-1 text-sm text-slate-600">
                            Be the first to give this post some
                        </p>
                        <span className="pumping-heart">
                            <Heart size={14} fill="#ef4444" className="text-red-500" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostButtons;