import { Header, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import React from 'react';

export default async function PostPageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getAuthSession();

    return (
        <main className='flex w-full min-h-screen mx-auto bg-gray-100 font-base'>
            <div className='flex flex-col w-full'>
                <div className='flex w-full'>
                    <Header session={session} />
                </div>
                <div className="flex sm:max-w-3xl lg:max-w-[calc(100%-288px)] sm:mx-auto lg:ml-auto lg:mr-0 h-full md:pt-16 relative max-w-full px-4 lg:px-10">
                    <Sidebar session={session} />
                    {children}
                </div>
            </div>
        </main>
    )
};
