// import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { UserPlus } from "lucide-react";
import { ExtendedPost } from "@/types/post";
import { Button, UserAvatar } from "..";
import { User } from "next-auth";
import Link from "next/link";

interface UserInfoCardProps {
    user: User | null;
    post: ExtendedPost;
}

const UserInfoCard: FC<UserInfoCardProps> = ({
    user,
    post
}) => {

    return (
        <div className="flex flex-col items-start w-full z-50">
            <div className="flex items-center justify-start flex-1 w-full gap-3">
                <div className="flex items-start">
                    <UserAvatar user={post.author} />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <span className="text-sm font-semibold truncate text-slate-800">
                        {post.author.username || "_shreyas_ms"}
                    </span>
                    <span className="text-xs text-gray-600 capitalize">
                        {post.author.name}
                    </span>
                </div>
            </div>
            <div className="flex items-center w-full mt-3 justify-evenly">
                <div className="flex flex-col items-center justify-center space-y-1">
                    <span className="font-semibold text-slate-800">
                        {post.author?.posts?.length}
                    </span>
                    <span className="text-xs text-gray-600">
                        Posts
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <span className="font-semibold text-slate-800">
                        {post.author?.followersIds?.length}
                    </span>
                    <span className="text-xs text-gray-600">
                        Followers
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <span className="font-semibold text-slate-800">
                        {post.author?.followingIds?.length}
                    </span>
                    <span className="text-xs text-gray-600">
                        Following
                    </span>
                </div>
            </div>
            {post.author.id === user?.id ? (
                <div className="flex flex-col border- items-center w-full mt-3 justify-center">
                    <div className="flex items-center flex-col justify-center gap-y-1.5 w-full border-t pt-3 pb-4">
                        <Image src="/svg/shield.svg" alt="" width={50} height={50} className='w-10 h-10 object-cover' />
                        <h4 className="font-semibold text-slate-800">
                            This is a private account
                        </h4>
                        <p className="text-sm text-slate-500">
                            Follow to see their photos and videos.
                        </p>
                    </div>
                    <Link href={`/u/${post?.author.id}`} className="w-full">
                        <Button className="w-full" size="md">
                            <span>
                                Edit Profile
                            </span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full mt-2 gap-x-0.5">
                    {post?.author?.posts?.slice(0, 3).map((post) => (
                        <div key={post.id} className="relative flex items-center w-full h-24 aspect-square">
                            <Image
                                src={post.image!}
                                alt=""
                                layout="fill"
                                unoptimized
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            )}
            {post.author.id !== user?.id ? (
                <div className="flex items-center w-full mt-4">
                    <Link href={`/u/${post.author.id}`} className="w-full">
                        <Button className="w-full" size="md">
                            <UserPlus className="w-4 h-4 mr-2 text-current" />
                            <span>
                                Follow
                            </span>
                        </Button>
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

export default UserInfoCard;