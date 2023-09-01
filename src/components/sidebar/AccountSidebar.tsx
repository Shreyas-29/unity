"use client";

import { ShieldCheck, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { accountRoutes } from '@/lib/routes';
import { cn } from '@/lib/utils';

const AccountSidebar = () => {

    const pathname = usePathname();

    return (
        <div className="flex flex-col items-start justify-start w-full h-full border-r lg:pl-72 border-slate-200">
            <div className="flex flex-col items-start justify-start w-full p-4 border-b cursor-pointer select-none lg:p-8 border-slate-200">
                <Link href="/" className="flex items-center cursor-pointer select-none">
                    <div className="flex items-center justify-start w-full gap-x-2">
                        <Image src="/icons/icon.svg" alt="" width={50} height={50} className="object-cover w-auto h-10" draggable={false} />
                    </div>
                </Link>
                <h4 className="mt-4 text-lg font-medium text-slate-900">
                    Account center
                </h4>
                <p className="mt-4 text-xs text-slate-600">
                    Manage your account connect experiences and account settings across the unity platform.
                </p>
                <div className="flex items-center mt-2 text-xs text-slate-600 gap-x-2">
                    <User className="w-4 h-4 text-current" />
                    <span>Personal details</span>
                </div>
                <div className="flex items-center mt-2 text-xs text-slate-600 gap-x-2">
                    <ShieldCheck className="w-4 h-4 text-current" />
                    <span>Personal details</span>
                </div>
                <div className="flex items-center mt-3 text-xs cursor-pointer text-neutral-900 gap-x-2">
                    <span>See more in accounts center</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-4 select-none">
                {accountRoutes?.map((route) => (
                    <Link
                        key={route.label}
                        href={route.href}
                        className={cn(
                            "w-full px-4 py-2.5 hover:bg-slate-200 rounded-md transition-all text-sm cursor-pointer",
                            pathname === route.href ? "text-slate-900 font-semibold" : "text-slate-600"
                        )}>
                        <span className="w-full text-sm">
                            {route.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AccountSidebar
