"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

const Providers = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <NextTopLoader color="#000" height={2} crawl={true} showSpinner={false} easing="ease" speed={200} shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
                {children}
            </SessionProvider>
        </QueryClientProvider>
    )
};

export default Providers;