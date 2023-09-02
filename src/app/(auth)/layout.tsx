import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Layout({
    children,
}: {
    children: React.ReactNode,
}) {

    const session = await getAuthSession();

    if (session?.user) {
        redirect("/");
    }

    return (
        <main className='flex w-full min-h-screen mx-auto font-base fixed inset-0 bg-slate-100 !z-[100]'>
            {children}
        </main>
    )
};
