import React from 'react';
import { getCurrentUser, getUserBookmarks, getUserPosts, getUsers } from "@/actions";
import Bookmarks from "./components/Bookmarks";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";

export default async function BookmarksPage() {

    const session: Session | null = await getAuthSession();

    const posts = await getUserPosts(session?.user.id as string);

    const bookmarks = await getUserBookmarks(session?.user.id as string);

    const user = await getCurrentUser();

    return (
        <div className="flex items-center justify-center w-full pt-20">
            <Bookmarks
                user={user}
                bookmarks={bookmarks}
                posts={posts}
            />
        </div>
    )
};
