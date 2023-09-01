"use client";

import { Dialog, DialogContent, PostContent } from "@/components";
import { useOptionsModal, useStoryModal } from "@/hooks";
import { IdPost } from "@/types/post-id";
import { ExtendedStory } from "@/types/story";
import { Story } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

interface StoryModalProps {
    story: ExtendedStory;
    session: Session | null;
}

const StoryModal: FC<StoryModalProps> = ({
    story,
    session,
}) => {

    const router = useRouter();

    const pathname = usePathname();

    const optionsModal = useOptionsModal();

    const storyModal = useStoryModal();

    const openModal = () => {
        optionsModal.onOpen();
    };

    const handleClose = () => {
        storyModal.onClose();
    };


    return (
        <Dialog open={storyModal.isOpen} onOpenChange={handleClose}>
            <DialogContent className="lg:h-[500px] min-h-[400px] lg:max-w-md w-full select-none overflow-hidden">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <Image
                        src={story?.image!}
                        alt="Image"
                        unoptimized
                        width={1000}
                        height={1000}
                        draggable={false}
                        onDrag={() => false}
                        className="object-cover w-full h-full rounded-lg select-none"
                    />
                    <p className="text-sm text-slate-800 mt-5">
                        {story?.content} by {" "}
                        <Link href={`/u/${story?.author?.id}`} className="text-sm font-medium transition-all hover:text-slate-900 text-slate-500">
                            {story?.author.username ?? story?.author.name}
                        </Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default StoryModal;