"use client";

import { Button } from "@/components";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DeleteButtonProps {
    storyId: string;
    delete: (storyId: string) => Promise<void>;
}

const DeleteButton: FC<DeleteButtonProps> = ({
    storyId, delete: handleDelete
}) => {

    const router = useRouter();

    return (
        <Button size="md" variant="destructive" onClick={() => {
            handleDelete(storyId);
            router.push("/");
        }}>
            <Trash size={20} />
        </Button>
    )
}


export default DeleteButton;