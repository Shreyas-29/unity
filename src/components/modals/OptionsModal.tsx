"use client";

import { Button, Dialog, DialogContent } from "@/components";
import { toast, useOptionsModal } from "@/hooks";
import { ExtendedPost } from "@/types/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface OptionsModalProps {
    post: ExtendedPost;
}

const OptionsModal: FC<OptionsModalProps> = ({
    post
}) => {

    const router = useRouter();

    const { data: session } = useSession();

    const optionsModal = useOptionsModal();

    const [copied, setCopied] = useState<boolean>(false);
    const [followed, setFollowed] = useState<boolean>(false);

    useEffect(() => {
        if (optionsModal.isOpen) {
            if (post?.author.followingIds.includes(session?.user?.id!)) {
                setFollowed(true);
            }
        }
    }, [optionsModal.isOpen, post?.author.followingIds, session?.user?.id]);

    const handleCloseModal = () => {
        optionsModal.onClose();
        setCopied(false);
        router.refresh();
    };

    const handleCopyLink = () => {
        setCopied(true);

        navigator.clipboard.writeText(`${window.location.origin}/p/${post?.id}`)
            .then(() => {
                optionsModal.onClose();
                toast({
                    description: "Link copied to clipboard!",
                })
            });
    };


    return (
        <Dialog open={optionsModal.isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="w-full max-w-sm p-0 border-none h-max">
                <div className="flex flex-col items-center justify-center w-full py-4">
                    <div className="w-full">
                        <Button variant="outline" size="lg" className="w-full border-transparent border-none text-destructive hover:bg-red-50 hover:text-destructive">
                            Report
                        </Button>
                    </div>
                    <div className="w-full border-b border-zinc-200/60">
                        {followed && (
                            <Button variant="outline" size="lg" className="w-full border-transparent border-none text-destructive hover:bg-red-50 hover:text-destructive">
                                Unfollow
                            </Button>
                        )}
                    </div>
                    <div className="w-full border-b border-zinc-200/60">
                        <Button variant="outline" size="lg" className="w-full border-transparent border-none">
                            Add to favorites
                        </Button>
                    </div>
                    <div className="w-full border-b border-zinc-200/60" onClick={() => router.push(`/p/${post?.id}`)}>
                        <Button variant="outline" size="lg" className="w-full border-transparent border-none">
                            Go to post
                        </Button>
                    </div>
                    <div className="w-full border-b border-zinc-200/60">
                        <Button variant="outline" size="lg" className="w-full border-transparent border-none">
                            Share post
                        </Button>
                    </div>
                    <div className="w-full border-b border-zinc-200/60" onClick={handleCopyLink}>
                        <Button variant="outline" size="lg" className="w-full border-transparent border-none">
                            {copied ? "Copied" : "Copy link"}
                        </Button>
                    </div>
                    <div className="w-full" onClick={handleCloseModal}>
                        <Button variant="outline" className="w-full border-transparent border-none">
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default OptionsModal;