"use client";

import { toast, useCustomToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/post";
import { Heart } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, experimental_useOptimistic as useOptimistic, useState } from "react";
import { Button } from "..";

interface PostActionsProps {
    post: ExtendedPost;
    session: Session | null;
    like: (postId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
}

// const PostActions2: FC<PostActionsProps> = ({
//     post,
//     like,
//     session,
//     bookmark
// }) => {

//     const router = useRouter();

//     const { authToast } = useCustomToast();

//     const [optimisticLikes, updateOptimisticLikes] = useOptimistic(post.likeIds, (state, newLike: string) => {
//         return [...state, newLike];
//     });

//     // const bookmarkId = post?.bookmarks?.map((bookmark) => bookmark.id);

//     // const [optimisticBookmarks, updateOptimisticBookmarks] = useOptimistic(postBookmarks, (state, newBookmark: string) => {
//     //     return [...state, newBookmark];
//     // });

//     // const [optimisticBookmarks, updateOptimisticBookmarks] = useOptimistic(
//     //     post?.bookmarks?.map((bookmark) => bookmark.id) || [],
//     //     (state, newBookmark: string) => {
//     //         return [...state, newBookmark];
//     //     });

//     // Step 1: Checking for as we are correct post id passing to inlcudes to compare
//     // Step 2: Checking for initialBookmarks are correct for sending for checking

//     const bookmarkIds = post?.bookmarks?.map((bookmark) => bookmark.id) || [];

//     const [optimisticBookmarks, updateOptimisticBookmarks] = useOptimistic(
//         bookmarkIds,
//         (state, newBookmarkId: string) => {
//             return [...state, newBookmarkId];
//         }
//     );

//     console.log("Optimistic saved: ", optimisticBookmarks, bookmarkIds, post);

//     // const [bookmarked, setBookmarked] = useState(optimisticBookmarks?.includes(post?.id!));
//     const [liked, setLiked] = useState<boolean>(optimisticLikes.includes(session?.user.id!));
//     const [bookmarked, setBookmarked] = useState(optimisticBookmarks?.includes(post?.id));
//     const [showFullContent, setShowFullContent] = useState<boolean>(false);
//     const [disableLike, setDisableLike] = useState<boolean>(false);
//     const [disabledBookmark, setDisabledBookmark] = useState<boolean>(false);

//     useEffect(() => {
//         setLiked(optimisticLikes.includes(session?.user.id!));
//         setBookmarked(optimisticBookmarks?.includes(post?.id));
//     }, [session?.user.id, post?.id]);

//     const handleLike = async (postId: string) => {
//         try {

//             if (!session?.user) {
//                 return authToast();
//             }

//             if (disableLike) {
//                 toast({
//                     title: "Slow down!",
//                     description: "You're liking too fast.",
//                     variant: "destructive"
//                 });
//                 return;
//             }

//             setDisableLike(true);

//             updateOptimisticLikes(postId);

//             const res = await like(postId);
//             if (res === true) {
//                 setLiked(true);
//                 localStorage.setItem(`post_${postId}`, "liked");
//             } else {
//                 setLiked(false);
//                 localStorage.removeItem(`post_${postId}`);
//             }
//         } catch (error) {
//             console.log("Error while handling like: ", error);
//         } finally {
//             router.refresh();
//             setTimeout(() => {
//                 setDisableLike(false);
//             }, 1000);
//         }
//     };

//     const handleBookmark = async (postId: string) => {
//         try {

//             if (!session?.user) {
//                 return authToast();
//             }

//             if (disabledBookmark) {
//                 toast({
//                     title: "Slow down!",
//                     description: "You're adding bookmark too fast.",
//                     variant: "destructive"
//                 });
//                 return;
//             }

//             setDisabledBookmark(true);

//             updateOptimisticBookmarks(postId);

//             const res = await bookmark(postId, session?.user.id);

//             if (res === true) {
//                 setBookmarked(true);
//                 localStorage.setItem(`post_${postId}`, "bookmark");
//                 toast({
//                     title: "Post saved!",
//                     description: "You can view your saved posts in your profile.",
//                     action: (
//                         <Link href={`/u/${session?.user?.id}?tab=bookmarks`} passHref className="pr-2.5">
//                             <Button type="button" size="md" variant="outline" className="text-slate-700">
//                                 View
//                             </Button>
//                         </Link>
//                     )
//                 });
//             } else {
//                 setBookmarked(false);
//                 localStorage.removeItem(`post_${postId}`);
//             }
//         } catch (error) {
//             console.log("Error while handling like: ", error);
//         } finally {
//             router.refresh();
//             setTimeout(() => {
//                 setDisabledBookmark(false);
//             }, 1000);
//         }
//     };

//     const toggleContent = () => {
//         setShowFullContent(!showFullContent);
//     };

//     return (
//         <div className="flex flex-col items-center justify-between w-full mb-2">
//             <div className="flex items-center justify-between w-full">
//                 <div className="flex items-center justify-start flex-1 gap-2">
//                     <Button
//                         size="xxs"
//                         variant="action"
//                         title={liked ? "Unlike" : "Like"}
//                         onClick={() => handleLike(post?.id)}
//                         className="transition-colors text-slate-800 hover:text-slate-400"
//                     >
//                         {liked ? (
//                             <Image src="/svg/heart-fill.svg" alt="" width={50} height={50} className='w-5 h-5' />
//                         ) : (
//                             <Image src="/svg/heart.svg" alt="" width={50} height={50} className='w-5 h-5' />
//                         )}
//                     </Button>
//                     <Button title="Share" variant="action" size="xxs" className="transition-colors text-slate-800 hover:text-slate-400">
//                         <Image src="/svg/send.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
//                     </Button>
//                     <Link href={`/p/${post.id}`}>
//                         <Button title="Comments" variant="action" size="xxs" className="transition-colors text-slate-800 hover:text-slate-400">
//                             <Image src="/svg/chat.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
//                         </Button>
//                     </Link>
//                 </div>
//                 <div className="flex items-center justify-end">
//                     <Button
//                         size="xxs"
//                         variant="action"
//                         title={bookmarked ? "Remove bookmark" : "Bookmark"}
//                         onClick={() => handleBookmark(post.id)}>
//                         {bookmarked ? (
//                             <Image src="/svg/bookmark-fill.svg" alt="" width={50} height={50} className='w-5 h-5' />
//                         ) : (
//                             <Image src="/svg/bookmark.svg" alt="" width={50} height={50} className='w-5 h-5' />
//                         )}
//                     </Button>
//                 </div>
//             </div>
//             <div className="flex items-center justify-start w-full my-1">
//                 {post?.likeIds?.length > 0 ? (
//                     <Link href={`/p/${post.id}`}>
//                         <Button
//                             size="sm"
//                             variant="action"
//                             title="Likes"
//                             className="flex items-center justify-start text-slate-800 hover:text-slate-500"
//                         >
//                             {post?.likeIds?.length} {" "} {post?.likeIds?.length === 1 ? "like" : "likes"}
//                         </Button>
//                     </Link>
//                 ) : (
//                     <div className="flex items-center w-full">
//                         <p className="mr-1 text-sm text-slate-600">
//                             Be the first to give this post some
//                         </p>
//                         <span className="pumping-heart">
//                             <Heart size={14} fill="#ef4444" className="text-red-500" />
//                         </span>
//                     </div>
//                 )}
//             </div>
//             <div className="flex flex-col items-center justify-start w-full mt-2">
//                 <div className="w-full cursor-pointer">
//                     <div className={cn(
//                         "flex items-center justify-start w-full cursor-pointer",
//                         showFullContent && "flex-col text-start items-start"
//                     )}>
//                         <span className="mr-1 text-sm font-bold text-slate-800 min-w-max">
//                             {post?.author.username || post.author.name}
//                         </span>
//                         {post.content && (
//                             <div className="text-sm text-neutral-800">
//                                 {showFullContent
//                                     ? <p className="whitespace-pre-line">
//                                         {post?.content}
//                                     </p>
//                                     :
//                                     <p className="flex-wrap">
//                                         {post?.content.slice(0, 20)}
//                                         {post?.content.length > 20 && "..."}
//                                     </p>
//                                 }
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex flex-wrap items-center w-full text-start">
//                     {post?.content.length > 20 && (
//                         <Button
//                             size="sm"
//                             variant="link"
//                             onClick={toggleContent}
//                             className={cn("text-slate-500 font-normal no-underline -ml-2", showFullContent && "hidden")}
//                         >
//                             {showFullContent ? '...less' : 'more'}
//                         </Button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PostActions2;