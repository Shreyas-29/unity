import { createPost, createStory, getPosts, getStories, getUsers } from '@/actions';
import { AlertModal, CreatePostModal, CreateStoryModal, MobileBottomBar, MobileHeader, Providers, SearchModal, Toaster } from '@/components';
import Header from '@/components/Header';
import { getAuthSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const fontBase = Inter({
    subsets: ['latin'],
    variable: '--font-base',
});

export const metadata: Metadata = {
    title: "Unity",
    description: "Unity is a social media platform for sharing photos and videos. 🚀",
};

export default async function Layout({
    children,
    post
}: {
    children: React.ReactNode,
    post: React.ReactNode
}) {

    const session = await getAuthSession();

    const posts = await getPosts();

    const stories = await getStories();

    const users = await getUsers();

    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen font-base relative bg-slate-100 antialiased",
                fontBase,
            )}>
                <Toaster />
                <Providers>
                    <CreatePostModal posts={posts} createPost={createPost} />
                    <CreateStoryModal stories={stories} createStory={createStory} />
                    <SearchModal users={users} />
                    <AlertModal />
                    <main className='flex w-full min-h-screen mx-auto font-base'>
                        <div className='relative flex flex-col w-full h-full'>
                            <div className='flex w-full'>
                                <Header session={session} />
                                <MobileHeader session={session} />
                                <MobileBottomBar session={session} />
                            </div>
                            {children}
                            {post}
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    )
};