import React from 'react';

export default async function StoryLayout({
    children,
}: {
    children: React.ReactNode
}) {

    // TODO: Change the title of the all pages accprdingly

    return (
        <main className='flex w-full min-h-screen mx-auto bg-slate-100 font-base'>
            <div className='relative flex flex-col w-full'>
                <div className="w-full h-px bg-gray-100"></div>
                {children}
            </div>
        </main>
    )
};
