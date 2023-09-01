"use client";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { ExtendedPost } from "@/types/post";
import Image from "next/image";
import { FC } from "react";

interface PostImageProps {
    post: ExtendedPost;
}

const PostImage: FC<PostImageProps> = ({
    post
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <div className="relative flex items-center justify-center w-full">
                    <div className="relative flex w-full my-2 h-96 rounded-2xl">
                        <TooltipTrigger asChild className="absolute inset-0 z-20 flex w-full h-full rounded-2xl">
                            <Button className="flex items-center justify-center w-full h-full text-sm bg-transparent hover:bg-transparent"></Button>
                        </TooltipTrigger>
                        {post.image ? (
                            <Image
                                src={post?.image}
                                alt={post?.image.charAt(0).toUpperCase()}
                                width={1000}
                                height={1000}
                                priority={true}
                                unoptimized={true}
                                className="object-cover w-full h-full rounded-xl"
                            />
                        ) : null}
                        {post.image ? (
                            <canvas className="absolute inset-0 hidden w-full h-96" />
                        ) : null}
                    </div>
                </div>
                <TooltipContent className="w-max p-2 dark:bg-blend-darken mx-auto !z-50" align="end">
                    <span className="w-max">
                        {post?.author?.username ?? post?.author?.name}
                    </span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default PostImage;