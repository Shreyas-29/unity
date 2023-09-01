"use client";

import { Dialog, DialogContent, PostContent } from "@/components";
import { useOptionsModal } from "@/hooks";
import { IdPost } from "@/types/post-id";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ModalProps {
    post: IdPost;
    session: Session | null;
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
    follow: (userId: string) => Promise<boolean | void>;
}

const Modal: FC<ModalProps> = ({
    post,
    session,
    like,
    bookmark,
    follow
}) => {

    const router = useRouter();

    const pathname = usePathname();

    const optionsModal = useOptionsModal();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const openModal = () => {
        optionsModal.onOpen();
    };

    const handleClose = () => {
        if (pathname !== "/") {
            router.back();
            setIsOpen(false);
        } else {
            router.push("/");
            setIsOpen(false);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="lg:max-w-5xl">
                <PostContent
                    post={post}
                    session={session}
                    like={like}
                    bookmark={bookmark}
                    follow={follow}
                />
            </DialogContent>
        </Dialog>
    );
}
export default Modal;