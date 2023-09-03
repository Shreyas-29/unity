"use client";

import { Session } from 'next-auth';
import Link from 'next/link';
import { FC } from "react";
import { Actions, Button } from ".";
import Image from 'next/image';
import { toast, useCreatePostModal } from '@/hooks';
import { useRouter } from 'next/navigation';

interface MobileBottomBarProps {
    session: Session | null;
}

const MobileBottomBar: FC<MobileBottomBarProps> = ({
    session
}) => {

    const router = useRouter();

    const createPostModal = useCreatePostModal();

    const handleCreatePost = () => {
        createPostModal.onOpen();
    };

    const handleSearch = () => {
        toast({
            title: 'Coming Soon',
            description: 'Search feature will be available soon.',
        });
    };

    const handleMessage = () => {
        toast({
            title: 'Coming Soon',
            description: 'Messaging feature will be available soon.',
        });
    };

    const handleProfile = () => {
        router.push('/account');
    };



    return (
        <header className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center overflow-visible md:hidden">
            <div className="relative z-50 w-full h-16 overflow-visible border-b border-slate-200 bg-white/30 backdrop-blur-xl shadow-gray-300/20">
                <div className="flex items-center w-full h-full justify-evenly">
                    <Link href="/" className="flex items-center cursor-pointer select-none" legacyBehavior>
                        <Button size="xs" variant="outline" className="bg-transparent border-none rounded-full">
                            <Image src="/svg/home.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            <span className='sr-only'>Home</span>
                        </Button>
                    </Link>
                    <Link href="/" className="flex items-center cursor-pointer select-none" legacyBehavior>
                        <Button onClick={handleSearch} size="xs" variant="outline" className="bg-transparent border-none rounded-full">
                            <Image src="/svg/search.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            <span className='sr-only'>Search</span>
                        </Button>
                    </Link>
                    <Link href="#" className="flex items-center cursor-pointer select-none" legacyBehavior>
                        <Button onClick={handleCreatePost} size="xs" variant="outline" className="bg-transparent border-none rounded-full">
                            <Image src="/svg/add.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            <span className='sr-only'>Create Post</span>
                        </Button>
                    </Link>
                    <Link href="#" className="flex items-center cursor-pointer select-none" legacyBehavior>
                        <Button onClick={handleMessage} size="xs" variant="outline" className="bg-transparent border-none rounded-full">
                            <Image src="/svg/send.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            <span className='sr-only'>Messages</span>
                        </Button>
                    </Link>
                    <Link href="/account" className="flex items-center cursor-pointer select-none" legacyBehavior>
                        <Button onClick={handleProfile} size="xs" variant="outline" className="bg-transparent border-none rounded-full">
                            <Image src="/svg/user.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            <span className='sr-only'>Account</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default MobileBottomBar;