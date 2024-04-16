"use client";

import { isImageValid } from '@/helpers';
import { useAlertModal, useCreateStoryModal, toast } from '@/hooks';
import { cn } from '@/lib/utils';
import { useStoryStore } from '@/store';
import { ExtendedStory } from '@/types/story';
import { ArrowLeft, Expand, HelpCircle, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useEffect, experimental_useOptimistic as useOptimistic, useRef, useState } from 'react';
// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button, Dialog, DialogContent, DialogTitle, Input, ToastAction, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..';

interface CreateStoryModalProps {
    createStory: (postData: FormData) => Promise<void>;
    stories: ExtendedStory[];
}

const CreateStoryModal: FC<CreateStoryModalProps> = ({
    createStory,
    stories
}) => {

    const { data: session } = useSession();

    const { pending } = useFormStatus();

    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);

    const [imageUrl, setImageUrl] = useState<string>("");
    const [editorOpen, setEditorOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<"top" | "center" | "bottom" | "left" | "right">("center");
    const [togglePosition, setTogglePosition] = useState<boolean>(false);


    const { caption, setCaption } = useStoryStore();
    const createStoryModal = useCreateStoryModal();
    const alertModal = useAlertModal();

    useEffect(() => {
        if (!createStoryModal.isOpen) {
            setImageUrl("");
            setEditorOpen(false);
            setCaption("");
        }
    }, [createStoryModal.isOpen, setCaption]);

    const [optimisticStories, addOptimisticStory] = useOptimistic(stories, (state, newStory: ExtendedStory) => {
        return [...state, newStory];
    });

    const handleEditorOpen = () => {
        if (imageUrl.trim() !== "" && isImageValid(imageUrl.trim())) {
            setEditorOpen(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!ref.current) return;
        const formData = new FormData(ref.current);
        const content = formData.get("content");

        if (!content || !imageUrl) {
            setIsLoading(false);
            return toast({
                title: "Something went wrong",
                description: "Caption or image is missing. Please try again.",
            });
        }

        addOptimisticStory({
            id: Math.random().toString().slice(25),
            content: content as string,
            authorId: session?.user?.id as string,
            image: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            author: session?.user! as any,
        });

        formData.set("image", imageUrl);

        try {
            await createStory(formData);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Could not create post. Please try again",
                variant: "destructive",
                action: <ToastAction altText="Try again" onClick={() => router.refresh()}>Try again</ToastAction>
            });
        } finally {
            router.refresh();
            setIsLoading(false);
            setError(false);
            createStoryModal.onClose();
            alertModal.onClose();
            setCaption("");
            setImageUrl("");
            setTimeout(() => {
                toast({
                    description: "Your story was published! 🎉"
                });
            }, 1000);
        }
    };

    const handleCloseModal = () => {
        if (pending || isLoading) return;
        if (imageUrl || caption.length) {
            alertModal.onOpen();
            createStoryModal.onOpen();
            return;
        }
        createStoryModal.onClose();
        setError(false);
        setCaption("");
        setImageUrl("");
        router.refresh();
    };

    const handleTogglePosition = (cover: "top" | "center" | "bottom" | "left" | "right") => {
        setPosition(cover);
    };


    return (
        <Dialog open={createStoryModal.isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className={cn(
                "lg:h-[500px] min-h-screen md:min-h-[400px] lg:max-w-md w-full select-none overflow-hidden",
                (editorOpen && imageUrl.length >= 1) && "md:min-h-[550px]"
            )}>
                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-full h-full"
                >
                    {!editorOpen && (
                        <div className={cn(
                            "flex flex-col items-center space-y-1.5 text-center w-full h-full",
                            // imageUrl.length !== 0 ? "hidden" : "flex"
                        )}>
                            <DialogTitle className="flex items-center justify-center w-full pb-2 mx-auto text-center">
                                <span className="text-center">
                                    Create new story
                                </span>
                            </DialogTitle>
                            <div className="w-full h-px bg-border" />
                            <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
                                <Image
                                    src="/svg/image.png"
                                    alt=""
                                    width={100}
                                    height={100}
                                    draggable={false}
                                    className="object-cover w-16 h-16"
                                />
                                <p className="mt-4 text-center text-gray-600">
                                    Add image to your story
                                </p>
                                <div className="relative flex items-center justify-center w-full max-w-sm mx-auto mt-4 select-none lg:px-8">
                                    <Input
                                        type="text"
                                        name="image"
                                        placeholder="Paste your image link here..."
                                        value={imageUrl}
                                        draggable={false}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
                                    />
                                </div>
                                {error && (
                                    <div className="flex items-center justify-center w-full my-2 gap-x-1">
                                        <p className="text-xs text-center text-destructive">
                                            Please enter valid image link
                                        </p>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <HelpCircle className="w-3 h-3 text-destructive" />
                                                </TooltipTrigger>
                                                <TooltipContent className="w-full max-w-xs">
                                                    <p className="w-full text-xs">
                                                        Please make sure the image URL starts with <strong>https://</strong> and is a valid image URL.
                                                        Example: <Link href="https://image.lexica.art/full_jpg/7b1f6d36-033f-4038-9c5f-250b9d0b66d1" target="_blank" rel="noopener noreferrer">
                                                            https://image.lexica.art
                                                        </Link>
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                )}
                                <div className="flex items-center justify-center w-full py-2 mt-2">
                                    <Button type="button" disabled={!imageUrl.trim()} onClick={handleEditorOpen}>
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {editorOpen && (
                        <div className="flex items-center justify-center w-full h-full overflow-hidden">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="flex flex-col items-center justify-center flex-1 w-full h-full mt-0 md:flex-row">
                                    <div className="relative flex flex-col items-center w-full h-full select-none">
                                        <div className="relative flex items-start w-full mt-4 overflow-hidden h-3/4">
                                            {imageUrl && (
                                                <div className="absolute inset-0 w-full h-full rounded-lg select-none" onClickCapture={() => false}>
                                                    <div className="relative w-full h-full">
                                                        <canvas className="absolute inset-0 w-full h-full rounded-lg select-none" />
                                                        <div className={`relative w-full h-full object-${position}`}>
                                                            <Image
                                                                src={imageUrl}
                                                                alt="Image"
                                                                unoptimized
                                                                width={1000}
                                                                height={1000}
                                                                draggable={false}
                                                                onDrag={() => false}
                                                                className="object-cover w-full h-full min-w-full min-h-full transition-transform duration-500 rounded-lg select-none"
                                                                style={{
                                                                    objectPosition: position,
                                                                    transformOrigin: 'center',
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="absolute flex items-center justify-center bottom-2 left-2">
                                                            {editorOpen && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button
                                                                                size="xxxs"
                                                                                type="button"
                                                                                variant="outline"
                                                                                disabled={isLoading}
                                                                                onClick={() => setTogglePosition((prev) => !prev)}
                                                                                className="w-7 h-7"
                                                                            >
                                                                                <Expand className="w-4 h-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="start">
                                                                            <p>Change position</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>

                                                        {togglePosition && editorOpen ? (
                                                            <div className="absolute flex items-center z-40 justify-start bottom-0.5 left-12 transition transform duration-500 w-full py-2">
                                                                <div className="space-x-3">
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => handleTogglePosition("top")} className={cn(
                                                                        position === "top" && "bg-primary text-primary-foreground hover:bg-primary/90 duration-500 hover:text-primary-foreground border-none"
                                                                    )}>
                                                                        Top
                                                                    </Button>
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => handleTogglePosition("center")} className={cn(
                                                                        position === "center" && "bg-primary text-primary-foreground hover:bg-primary/90 duration-500 hover:text-primary-foreground border-none"
                                                                    )}>
                                                                        Center
                                                                    </Button>
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => handleTogglePosition("bottom")} className={cn(
                                                                        position === "bottom" && "bg-primary text-primary-foreground hover:bg-primary/90 duration-500 hover:text-primary-foreground border-none"
                                                                    )}>
                                                                        Bottom
                                                                    </Button>
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => handleTogglePosition("left")} className={cn(
                                                                        position === "left" && "bg-primary text-primary-foreground hover:bg-primary/90 duration-500 hover:text-primary-foreground border-none"
                                                                    )}>
                                                                        Left
                                                                    </Button>
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => handleTogglePosition("right")} className={cn(
                                                                        position === "right" && "bg-primary text-primary-foreground hover:bg-primary/90 duration-500 hover:text-primary-foreground border-none"
                                                                    )}>
                                                                        Right
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : null}

                                                        <div className="absolute flex items-center justify-center top-2 left-2">
                                                            {editorOpen && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button
                                                                                size="xxxs"
                                                                                type="button"
                                                                                variant="outline"
                                                                                disabled={isLoading}
                                                                                onClick={() => {
                                                                                    if (editorOpen) {
                                                                                        setEditorOpen(false);
                                                                                        return;
                                                                                    }
                                                                                    alertModal.onOpen();
                                                                                    createStoryModal.onOpen();
                                                                                }}
                                                                                className="w-7 h-7"
                                                                            // className="absolute top-2 right-2"
                                                                            >
                                                                                <ArrowLeft className="w-4 h-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>Back</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                        <div className="absolute flex items-center justify-center top-2 right-2">
                                                            {editorOpen && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button
                                                                                size="xxxs"
                                                                                type="button"
                                                                                variant="outline"
                                                                                disabled={isLoading}
                                                                                onClick={() => {
                                                                                    setImageUrl("");
                                                                                    setEditorOpen(false);
                                                                                }}
                                                                            // className="w-7 h-7"
                                                                            // className="absolute top-2 right-2"
                                                                            >
                                                                                <X className="w-4 h-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="end">
                                                                            <p>Delete Image</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {editorOpen ? (
                                            <div className="relative flex flex-col items-start w-full h-1/4">
                                                <div className="flex flex-col items-end justify-end w-full h-full">
                                                    <div className="flex flex-col items-center justify-center w-full h-full mt-auto">
                                                        <div className="flex items-center justify-center w-full p-1">
                                                            <Input
                                                                type="text"
                                                                name="content"
                                                                disabled={pending || isLoading}
                                                                value={caption}
                                                                onChange={(e) => setCaption(e.target.value)}
                                                                placeholder="Add a caption..."
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full px-1 py-3">
                                                        <Button
                                                            type="submit"
                                                            size="default"
                                                            isLoading={isLoading}
                                                            disabled={isLoading}
                                                            className={cn(
                                                                "w-full",
                                                                isLoading && "opacity-50 cursor-not-allowed"
                                                            )}
                                                        >
                                                            {isLoading ? "Publishing..." : "Publish"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateStoryModal
