"use client";

import { Button } from "@/components";
import { ExtendedBookmark } from "@/types/bookmark";
import { ExtendedPost } from "@/types/post";
import { Heart, MessageCircle } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BookmarksProps {
    posts?: ExtendedPost[] | null;
    user: User | null;
    bookmarks: ExtendedBookmark[] | null;
}

const Bookmarks: FC<BookmarksProps> = ({
    posts,
    user,
    bookmarks
}) => {

    const bookmarkPosts = bookmarks?.filter((post) => post.postId);

    return (
        <div className="w-full mx-auto h-full flex flex-col items-start">
            <div className="flex flex-col items-start my-6">
                <h1 className="text-2xl capitalize font-semibold text-gray-800">
                    {user?.name}'s Bookmarks
                </h1>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 py-4 mx-auto md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {bookmarkPosts?.map((bookmark) => (
                    <div key={bookmark.id} className="relative flex items-center justify-center w-full cursor-pointer group">
                        <Link href={`/p/${bookmark.id}`} className="w-full">
                            <div className="relative flex items-center justify-center min-w-full h-72 rounded-xl">
                                <Image
                                    src={bookmark?.post.image}
                                    alt=""
                                    width={500}
                                    height={500}
                                    unoptimized
                                    className="object-cover w-full h-full rounded-xl"
                                />
                                {/* <canvas className="w-full select-none h-52 rounded-xl" /> */}
                                <div className="absolute inset-0 hidden lg:flex items-center justify-center transition duration-300 ease-in-out opacity-0 cursor-pointer bg-black/30 w-full h-72 rounded-xl group-hover:opacity-100">
                                    <div className="flex items-center justify-center w-full h-full space-x-4 rounded-xl">
                                        <Button
                                            size="xxs"
                                            variant="ghost"
                                            className="text-white bg-transparent rounded-lg hover:text-white hover:bg-transparent"
                                        >
                                            <Heart className="w-5 h-5" />
                                            <span className="ml-1 text-sm">
                                                {bookmark?.post?.likes?.length}
                                            </span>
                                        </Button>
                                        <Button
                                            size="xxs"
                                            variant="ghost"
                                            className="text-white bg-transparent rounded-lg hover:text-white hover:bg-transparent"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="ml-1 text-sm">
                                                {bookmark?.post.likes?.length}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Bookmarks
