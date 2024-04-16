import { Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import React from 'react';

export default async function BookmarkPageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getAuthSession();

    return (
        <div className='flex w-full min-h-screen mx-auto bg-gray-100 font-base'>
            <div className="flex relative w-full max-w-4xl mx-auto px-4 lg:px-10 h-full">
                <Sidebar session={session} />
                {children}
            </div>
        </div>
    )
};
