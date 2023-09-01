import { AccountSidebar, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import React from 'react';

export default async function AccountPageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    // TODO: Change the title of the all pages accprdingly

    const session = await getAuthSession();

    return (
        <main className='flex w-full min-h-screen mx-auto bg-slate-100 font-base'>
            <div className='relative flex flex-col w-full'>
                <div className="w-full h-px bg-gray-100"></div>
                {/* {children} */}
                <div className="relative flex w-full h-full mx-auto md:pt-16 md:px-4">
                    <Sidebar session={session} border={true} />
                    <section className="flex-1 w-full h-full px-4 mx-auto">
                        <div className="grid w-full h-full max-w-6xl grid-cols-12 mx-auto">
                            <div className="hidden w-full h-full col-span-6 p-4 lg:p-8 lg:inline-block">
                                <AccountSidebar />
                            </div>
                            <div className="w-full h-full col-span-12 p-4 lg:col-span-6 lg:p-8">
                                {children}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
};
