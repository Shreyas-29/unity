import { Header } from '@/components';
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
                {children}
            </div>
        </main>
    )
};
