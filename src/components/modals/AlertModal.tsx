"use client";

import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components";
import { useAlertModal, useCreatePostModal, useCreateStoryModal } from "@/hooks";
import { usePostStore, useStoryStore } from "@/store";
import { useRouter } from "next/navigation";


const AlertModal = () => {

    const router = useRouter();

    const postInput = usePostStore();
    const caption = useStoryStore();
    const alertModal = useAlertModal();
    const createPostModal = useCreatePostModal();
    const createStoryModal = useCreateStoryModal();

    const handleModalClose = () => {
        postInput.setPostText("");
        caption.setCaption("");
        alertModal.onClose();
        createPostModal.onClose();
        createStoryModal.onClose();
        router.refresh();
    };

    const handleOnChange = () => {
        alertModal.onClose();
        createPostModal.onOpen();
    };


    return (
        <Dialog open={alertModal.isOpen} onOpenChange={handleOnChange}>
            <DialogContent className="w-full max-w-sm">
                <DialogHeader className="mb-2">
                    <DialogTitle className="flex items-start justify-start w-full pb-4">
                        Discard post?
                    </DialogTitle>
                    <DialogDescription className="flex items-start justify-start w-full">
                        If you leave, your changes won&apos;t be saved.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center w-full gap-4 md:hidden">
                    <button className="w-full py-1 font-medium text-center transition duration-300 bg-white rounded-md text-destructive :bg-red-50">
                        Discard
                    </button>
                    <div className="w-full h-px -my-2 bg-gray-100" />
                    <button className="w-full py-1 font-medium text-center transition duration-300 bg-white rounded-md text-secondary-foreground :bg-secondary">
                        Cancel
                    </button>
                </div>
                <div className="flex items-center justify-end w-full gap-4">
                    <Button size="md" variant="outline" onClick={alertModal.onClose}>
                        Cancel
                    </Button>
                    <Button size="md" variant="destructive" onClick={handleModalClose}>
                        Discard
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AlertModal;