import { Session } from 'next-auth';
import Link from 'next/link';
import { FC } from "react";
import { Actions, Button } from ".";
import Image from 'next/image';

interface HeaderProps {
    session?: Session | null;
}

const Header: FC<HeaderProps> = ({
    session
}) => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 items-center justify-center hidden overflow-visible md:flex">
            <div className="relative z-50 border-b border-slate-200 w-full h-16 px-4 overflow-visible bg-white/30 backdrop-blur-xl shadow-gray-300/20 md:px-6 lg:px-12">
                {/* <div className="relative z-50 w-full h-16 px-4 overflow-visible shadow- bg-white/50 backdrop-blur-md rounded-2xl shadow-gray-300/20 md:px-6 lg:px-12"> */}
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center justify-start">
                        <Link href="/" className="flex items-center cursor-pointer select-none gap-x-2">
                            <Image src="/icons/logo.svg" alt="" width={50} height={50} className="object-cover w-10 h-10" draggable={false} />
                        </Link>
                    </div>
                    <div className='flex items-center justify-center w-full max-w-sm mx-auto'>
                        {/* <Searchbar /> */}
                    </div>
                    {session?.user ? (
                        <div className='flex items-center justify-center gap-4'>
                            <Actions session={session} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-end">
                            <Link href="/signin">
                                <Button>
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

export default Header;