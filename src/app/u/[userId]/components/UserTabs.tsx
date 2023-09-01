"use client";

import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { useCreatePostModal } from "@/hooks";
import { ExtendedBookmark } from "@/types/bookmark";
import { ExtendedPost } from "@/types/post";
import { User } from "next-auth";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from "react";
import UserBookmarks from "./UserBookmarks";
import UserPosts from "./UserPosts";
import UserTags from "./UserTags";
import { ExtendedUser } from "@/types/user";

interface UserTabsProps {
    user: ExtendedUser | null;
    paramsUser: ExtendedUser | null;
    posts: ExtendedPost[] | null;
    bookmarks: ExtendedBookmark[] | null;
}

const UserTabs: FC<UserTabsProps> = ({
    user,
    posts,
    bookmarks,
    paramsUser
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    const createPostModal = useCreatePostModal();

    const [currentTab, setCurrentTab] = useState(tab || 'posts');

    useEffect(() => {
        setCurrentTab(tab || 'posts');
    }, [tab]);

    useEffect(() => {
        router.refresh();
    }, [currentTab, router]);

    const parts = pathname.split('/');

    const userId = parts[2];

    const isAuthor = user?.id === userId;

    const handleChangeTab = (tab: string) => {
        setCurrentTab(tab);
        router.push(pathname + '?tab=' + tab);
    };


    return (
        <div className="flex items-center justify-center w-full py-5">
            {isAuthor ? (
                <Tabs defaultValue={currentTab || 'posts'} className="flex flex-col items-center justify-center w-full max-w-4xl mt-4 bg-transparent">
                    <Separator />
                    <TabsList className="w-full max-w-xl mx-auto mt-0 bg-transparent">
                        <TabsTrigger
                            onClick={() => handleChangeTab("posts")}
                            className="w-full data-[state=active]:shadow-none rounded-lg data-[state=active]:!bg-transparent gap-1.5"
                            value="posts"
                        >
                            <Image src="/svg/post.svg" alt="" width={50} height={50} className='w-4 h-4 grayscale' />
                            <span>Posts</span>
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => handleChangeTab("tag")}
                            className="w-full data-[state=active]:shadow-none rounded-lg data-[state=active]:!bg-transparent gap-1.5"
                            value="tag"
                        >
                            <Image src="/svg/user.svg" alt="" width={50} height={50} className='w-4 h-4 grayscale' />
                            <span>Tagged</span>
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => handleChangeTab("bookmarks")}
                            className="w-full data-[state=active]:shadow-none rounded-lg data-[state=active]:!bg-transparent gap-1.5"
                            value="bookmarks"
                        >
                            <Image src="/svg/bookmark.svg" alt="" width={50} height={50} className='w-4 h-4 grayscale' />
                            <span>Bookmarks</span>
                        </TabsTrigger>
                    </TabsList>
                    {/* <Separator className="my-" /> */}
                    <TabsContent value="posts" className="w-full">
                        {posts?.length! >= 1 ? (
                            <UserPosts posts={posts} />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full py-4 mx-auto">
                                <div className="flex items-center justify-center w-full mt-4 cursor-pointer hover:opacity-80" onClick={createPostModal.onOpen}>
                                    <Image
                                        src="/svg/camera.svg"
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="object-cover w-16 h-16"
                                    />
                                </div>
                                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                                    Share your posts
                                </h2>
                                <p className="mt-4 text-sm text-slate-500">
                                    When you share your posts, they will appear here.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="tag" className="w-full">
                        <UserTags posts={posts} />
                    </TabsContent>
                    <TabsContent value="bookmarks" className="w-full">
                        {/* {posts?.filter(post => post.bookmarkIds.includes(user?.id!)).length! >= 1 ? (
                            <UserBookmarks posts={posts} user={user} bookmarks={bookmarks} />
                        ) : ( */}
                        {bookmarks?.length! >= 1 ? (
                            <UserBookmarks posts={posts} user={user} bookmarks={bookmarks} />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full py-4 mx-auto">
                                <div className="flex items-center justify-center w-full mt-4" onClick={createPostModal.onOpen}>
                                    <Image
                                        src="/svg/bookmark.svg"
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="object-cover w-16 h-16"
                                    />
                                </div>
                                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                                    Save your posts
                                </h2>
                                <p className="mt-4 text-sm text-slate-500">
                                    When you save your posts, they will appear here.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="flex flex-col items-center justify-center w-full">
                    <Separator />
                    <div className="flex items-center justify-center w-full max-w-4xl mt-4">
                        {paramsUser?.posts?.length! >= 1 ? (
                            <UserPosts posts={paramsUser?.posts as ExtendedPost[]} />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full py-4 mx-auto">
                                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                                    {paramsUser?.name} has no posts
                                </h2>
                                <p className="mt-4 text-sm text-slate-500">
                                    When {paramsUser?.name} shares posts, they will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserTabs;