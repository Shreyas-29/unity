import { Session } from 'next-auth';
import Link from 'next/link';
import { FC } from "react";
import { Actions, Button, UserAvatar } from ".";
import Image from 'next/image';

interface MobileHeaderProps {
    session?: Session | null;
}

const MobileHeader: FC<MobileHeaderProps> = ({
    session
}) => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center overflow-visible md:hidden">
            <div className="relative z-50 w-full h-16 px-4 overflow-visible border-b border-slate-200 bg-white/30 backdrop-blur-xl shadow-gray-300/20">
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center justify-start">
                        <Link href="/" className="flex items-center cursor-pointer select-none gap-x-2">
                            <Image src="/icons/logo.svg" alt="" width={50} height={50} className="object-cover w-9 h-9" draggable={false} />
                        </Link>
                    </div>
                    {session?.user ? (
                        <div className='flex items-center justify-center gap-4'>
                            <Link href={`/u/${session?.user.id}`} legacyBehavior passHref>
                                <UserAvatar user={session?.user!} />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-end">
                            <Link href="/signin">
                                <Button size="md">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default MobileHeader;