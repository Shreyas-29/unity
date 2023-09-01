import { Sidebar } from '@/components'
import { getAuthSession } from '@/lib/auth';
import React from 'react'
import UserInfo from './components/UserInfo';
import { follow, getCurrentUser, getParamsUser, getUserBookmarks, getUserPosts, profileCount } from '@/actions';
import { ExtendedUser } from '@/types/user';
import { Session } from 'next-auth';

export default async function UserPage({
    params
}: {
    params: { userId: string }
}) {

    const session: Session | null = await getAuthSession();

    const posts = await getUserPosts(params.userId);

    const bookmarks = await getUserBookmarks(params.userId);

    const user = await getCurrentUser();

    const paramsUser = await getParamsUser(params.userId);

    // const followersIds = (session?.user.id === paramsUser?.id) ? session?.user?.followersIds : paramsUser?.followersIds || [];

    let followersIds = [];

    if (user?.id === paramsUser?.id) {
        followersIds = user?.followersIds || [];
    } else {
        followersIds = paramsUser?.followersIds || [];
    }

    return (
        <div className="relative flex w-full h-full mx-auto md:pt-16 md:px-4">
            <Sidebar session={session} border={true} />
            <section className='flex-1 w-full h-full px-4 mx-auto'>
                <div className='flex flex-col items-center justify-center w-full h-full mx-auto'>
                    <UserInfo
                        session={session}
                        posts={posts}
                        bookmarks={bookmarks}
                        user={user! as ExtendedUser}
                        paramsUser={paramsUser! as ExtendedUser}
                        follow={follow}
                        profileCount={profileCount}
                    />
                </div>
            </section>
        </div>
    )
}
