"use client";

import { Button, UserAvatar } from "@/components";
import { ExtendedBookmark } from "@/types/bookmark";
import { ExtendedPost } from "@/types/post";
import { Settings } from "lucide-react";
import { Session, User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { FC, useEffect, experimental_useOptimistic as useOptimistic, useState } from "react";
import UserTabs from "./UserTabs";
import { ExtendedUser } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import { useCustomToast, toast } from "@/hooks";
import { useFollowingStore } from "@/store";
import { ProfileView } from "@prisma/client";

interface UserInfoProps {
    session: Session | null;
    posts: ExtendedPost[] | null;
    bookmarks: ExtendedBookmark[] | null;
    user: ExtendedUser | null;
    paramsUser: ExtendedUser | null;
    follow: (userId: string) => Promise<boolean | void>;
    profileCount: (userId: string) => Promise<ProfileView>;
}

const UserInfo: FC<UserInfoProps> = ({
    session,
    posts,
    bookmarks,
    user,
    paramsUser,
    follow,
    profileCount
}) => {

    const pathname = usePathname();
    const parts = pathname.split('/');
    const userId = parts[2];
    const isAuthor = user?.id === userId;

    const router = useRouter();

    const following = useFollowingStore();

    const { authToast } = useCustomToast();

    // User views count
    useEffect(() => {
        if (paramsUser?.id) {
            profileCount(paramsUser?.id! as string);
            console.log("updated user count")
        }
    }, [paramsUser?.id, profileCount]);

    // const followedIds = paramsUser?.followersIds || [];
    // const [optimisticFollowedIds, updateOptimisticFollowedIds] = useOptimistic(followedIds,
    //     (state, newFollowedId: string) => {
    //         return [...state, newFollowedId];
    //     }
    // );

    const followingIds = following.followingIds || [];
    // const followingIds = session?.user?.followingIds || [];

    // const [optimisticFollowingIds, updateOptimisticFollowingIds] = useOptimistic(followingIds,
    //     (state, newFollowingId: string) => {
    //         return [...state, newFollowingId];
    //     }
    // );

    const followedIds = paramsUser?.followersIds || [];

    const [optimisticFollowedIds, updateOptimisticFollowedIds] = useOptimistic(followedIds,
        (state, newFollowedId: string) => {
            return [...state, newFollowedId];
        }
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [followed, setFollowed] = useState<boolean>(optimisticFollowedIds?.includes(session?.user.id!) ?? false);
    const [disabledFollow, setDisabledFollow] = useState<boolean>(false);

    const handleFollow = async () => {
        setIsLoading(true);

        try {

            if (!session?.user) {
                setIsLoading(false);
                return authToast();
            }

            if (disabledFollow) {
                setIsLoading(false);
                toast({
                    title: "Slow down!",
                    description: "You're adding following too fast.",
                    variant: "destructive"
                });
                return;
            }

            // if (paramsUser?.followersIds?.includes(session?.user.id)) {
            //     toast({
            //         title: "Already following!",
            //         description: "You're already following this user.",
            //         variant: "destructive"
            //     });
            //     return;
            // }

            setDisabledFollow(true);

            updateOptimisticFollowedIds(session?.user.id!);

            const res = await follow(paramsUser?.id!);

            console.log("res", res);

            if (res === true) {
                setFollowed(true);

                const newFollowingIds = [...following.followingIds, paramsUser?.id!];

                following.setFollowingIds(newFollowingIds);

            } else {
                setFollowed(false);
            }

        } catch (error) {
            toast({
                title: 'Something went wrong.',
                description: 'Your follower was not followed. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
            router.refresh();
            setTimeout(() => {
                setDisabledFollow(false);
            }, 1000);
        }
    };


    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-8 md:py-0 md:pl-40 lg:pl-56">
            <div className="flex items-center justify-start w-full max-w-xl gap-10 pt-8 pb-12 lg:gap-14">
                <div className="justify-start hidden md:flex">
                    <UserAvatar user={paramsUser} width="150px" height="150px" />
                </div>
                <div className="flex justify-start md:hidden">
                    <UserAvatar user={paramsUser} width="120px" height="120px" />
                </div>
                <div className="flex flex-col items-start flex-1">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <h4 className="text-lg text-gray-900">
                            {paramsUser?.username || paramsUser?.name}
                        </h4>
                        {isAuthor ? (
                            <div className="flex items-center gap-x-4">
                                <Button variant="secondary" className="flex items-center justify-center h-8 px-3 py-2 text-center">
                                    Edit Profile
                                </Button>
                                <Button variant="secondary" className="flex items-center justify-center h-8 px-3 py-2 text-center" onClick={() => signOut()}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-4">
                                <Button
                                    variant="secondary"
                                    isLoading={isLoading}
                                    onClick={handleFollow}
                                    className="flex items-center justify-center h-8 px-3 py-2 text-center"
                                >
                                    {followed ? "Unfollow" : "Follow"}
                                </Button>
                                <Button variant="secondary" className="flex items-center justify-center h-8 px-3 py-2 text-center">
                                    Message
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-start gap-4 mt-4">
                        <div className="text-gray-800">
                            <span className="mr-0.5 font-semibold">
                                {paramsUser?.posts?.length}
                            </span>
                            <span className="text-current">
                                {paramsUser?.posts?.length === 1 ? "post" : "posts"}
                            </span>
                        </div>
                        <div className="text-gray-800">
                            <span className="mr-0.5 font-semibold">
                                {paramsUser?.followersIds?.length}
                            </span>
                            <span className="text-current">
                                {paramsUser?.followersIds?.length === 1 ? "follower" : "followers"}
                            </span>
                        </div>
                        <div className="text-gray-800">
                            <span className="mr-0.5 font-semibold">
                                {paramsUser?.followingIds?.length}
                            </span>
                            <span className="text-current">
                                following
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 gap-y-1 text-start">
                        <span className="font-bold text-gray-900">
                            {paramsUser?.name}
                        </span>
                        <p className="text-sm font-normal whitespace-pre-line">
                            {paramsUser?.bio && paramsUser.bio}
                        </p>
                        <span className="text-gray-800">
                            {paramsUser?.email}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full">
                <UserTabs user={user!} posts={posts} bookmarks={bookmarks} paramsUser={paramsUser} />
            </div>
        </div>
    );
}

export default UserInfo;