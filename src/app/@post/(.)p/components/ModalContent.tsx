"use client";

import { Modal } from "@/components";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ModalContentProps {

}

const ModalContent: FC<ModalContentProps> = ({ }) => {


    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        router.back();
    };

    return (
        <div className="flex items-center justify-center w-full h-40">
            Post Modal Content
        </div>
    );
}

export default ModalContent;