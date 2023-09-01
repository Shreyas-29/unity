"use client";

import { ExtendedPost } from "@/types/post";
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from "next-auth";
import { FC } from "react";
import { Post } from "..";

interface PostFeedProps {
    session: Session | null;
    posts: ExtendedPost[] | undefined;
    like: (postId: string, userId: string) => Promise<boolean | void>
    bookmark: (postId: string, userId: string) => Promise<boolean | void>
}

const PostFeed: FC<PostFeedProps> = ({
    session,
    posts,
    like,
    bookmark
}) => {

    return (
        <AnimatePresence initial={false}>
            {posts?.map((post) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, type: "keyframes", ease: "easeInOut" }}
                >
                    <Post
                        post={post as ExtendedPost}
                        session={session}
                        like={like}
                        bookmark={bookmark}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    );
}

export default PostFeed;