"use client";

import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FC } from 'react';

interface SidebarProps {
    session?: Session | null;
    border?: boolean;
}

const Sidebar: FC<SidebarProps> = ({
    session,
    border
}) => {

    const pathname = usePathname();


    {/* <div className={cn(
        "fixed left-0 bottom-0 top-24 pb-28 md:px-4 w-[10%] sm:w-[11%] md:w-[12%] xl:w-72 h-full z-50 hidden md:inline-block",
        border && "border-r border-gray-100"
        <div className="flex flex-col items-center justify-between w-full h-full pt-8 pb-2 bg-white shadow-top-riht rounded-2xl md:px-4">
    )}> */}
    return (
        <div className={cn(
            "fixed left-0 bottom-0 top-16 pb-24 md:px-4 w-[10%] sm:w-[11%] md:w-[12%] xl:w-72 h-full z-50 hidden md:inline-block bg-white overflow-hidden",
            border && "border-r border-gray-100"
        )}>
            <div className="flex flex-col items-center justify-between w-full h-full pt-4 mt-4">
                <div className="w-full space-y-4">
                    {routes?.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center justify-center xl:justify-start w-full xl:px-5 py-2.5 font-medium group transition transform duration-300 active:scale-90 rounded-xl font-base hover:bg-slate-100 text-slate-700",
                                pathname === route.href ? "text-slate-900 font-semibold" : route.color
                            )}
                        >
                            <div className="flex items-center w-max xl:w-full">
                                <Image
                                    src={route.image!}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="object-cover w-4 h-4 select-none xl:mr-3 group-hover:scale-110"
                                />
                                <span className="hidden text-sm xl:block">
                                    {route.label}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full mt-auto mb-3 xl:justify-start">
                    <div className="flex items-center justify-center lg:justify-start w-full py-2.5 cursor-pointer hover:bg-slate-100 group text-slate-700 rounded-xl xl:px-5">
                        <div className="flex items-center w-max xl:w-full">
                            <Image
                                src="/svg/menu.svg"
                                alt=""
                                width={50}
                                height={50}
                                className="object-cover w-4 h-4 select-none xl:mr-3 group-hover:scale-110"
                            />
                            {/* npm install lucide-react@0.263.1 */}
                            <span className="hidden text-sm xl:block">
                                Menu
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;