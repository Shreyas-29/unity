"use client";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UserNav } from "@/components";
import { useCreatePostModal } from "@/hooks";
import { Session } from "next-auth";
import Image from "next/image";
import { FC } from "react";

interface ActionsProps {
    session: Session | null;
}

const Actions: FC<ActionsProps> = ({
    session
}) => {

    const createPostModal = useCreatePostModal();

    const openModal = () => {
        createPostModal.onOpen();
    };


    return (
        <div className="flex items-center gap-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild onClick={openModal}>
                        <Button size="xs" variant="outline" className="bg-transparent rounded-full">
                            <Image src="/svg/add.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Create a post</p>
                    </TooltipContent>
                </Tooltip>
                <div className='relative flex'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="xs" variant="outline" className="bg-transparent rounded-full">
                                <Image src="/svg/send.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Messages</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="xs" variant="outline" className="bg-transparent rounded-full">
                            <Image src="/svg/bell.svg" alt="" width={50} height={50} className='w-5 h-5 text-slate-700' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Notifications</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='relative flex items-center'>
                            <UserNav user={session?.user!} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Account</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default Actions;