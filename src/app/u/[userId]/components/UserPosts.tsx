import { Button } from "@/components";
import { ExtendedPost } from "@/types/post";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserPostsProps {
    posts: ExtendedPost[] | null;
}

const UserPosts: FC<UserPostsProps> = ({
    posts
}) => {

    return (
        <div className="grid w-full grid-cols-1 gap-4 py-4 mx-auto md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts?.map((post) => (
                <div key={post.id} className="relative flex items-center justify-center w-full cursor-pointer group">
                    <Link href={`/p/${post.id}`} className="w-full">
                        <div className="relative flex items-center justify-center min-w-full h-72 rounded-xl">
                            <Image
                                src={post?.image}
                                alt=""
                                width={500}
                                height={500}
                                unoptimized
                                className="object-cover w-full h-full rounded-xl"
                            />
                            {/* <canvas className="w-full select-none h-52 rounded-xl" /> */}
                            <div className="absolute inset-0 hidden lg:flex items-center justify-center transition duration-300 ease-in-out opacity-0 cursor-pointer bg-black/30 w-72 h-72 rounded-xl group-hover:opacity-100">
                                <div className="flex items-center justify-center w-full h-full space-x-4 rounded-xl">
                                    <Button
                                        size="xxs"
                                        variant="ghost"
                                        className="text-white bg-transparent rounded-lg hover:text-white hover:bg-transparent"
                                    >
                                        <Heart className="w-5 h-5" />
                                        <span className="ml-1 text-sm">
                                            {post?.likes?.length ?? 5}
                                        </span>
                                    </Button>
                                    <Button
                                        size="xxs"
                                        variant="ghost"
                                        className="text-white bg-transparent rounded-lg hover:text-white hover:bg-transparent"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="ml-1 text-sm">
                                            {/* {post.comments.length} */} 5
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UserPosts;