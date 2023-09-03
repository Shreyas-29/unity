"use client";

import { isImageValid } from '@/helpers';
import { toast, useAlertModal, useCreatePostModal, useOnClickOutside } from '@/hooks';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Audience, Post } from "@prisma/client";
import { ArrowLeft, CalendarClock, HelpCircle, MapPin, Smile, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useEffect, experimental_useOptimistic as useOptimistic, useRef, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button, Dialog, DialogContent, DialogTitle, Input, Label, Switch, Textarea, ToastAction, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UserAvatar } from '..';


interface CreatePostModalProps {
    // createPost: (
    //     content: string,
    //     location: string,
    //     imageUrl: string,
    //     audience: string,
    //     authorId: string
    // ) => Promise<void>;
    createPost: (postData: FormData) => Promise<void>;
    posts: Post[];
}

const CreatePostModal: FC<CreatePostModalProps> = ({
    createPost,
    posts
}) => {

    const { data: session } = useSession();

    const { pending } = useFormStatus();

    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);

    const [imageUrl, setImageUrl] = useState<string>("");
    const [audience, setAudience] = useState<Audience>("PUBLIC");
    const [editorOpen, setEditorOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createPostModal = useCreatePostModal();
    const alertModal = useAlertModal();
    const postInput = usePostStore();

    useEffect(() => {
        if (!createPostModal.isOpen) {
            setImageUrl("");
            setEditorOpen(false);
            postInput.setPostText("");
        }
    }, [createPostModal.isOpen, postInput.postText]);

    const [optimisticPosts, addOptimisticPost] = useOptimistic(posts, (state, newPost: Post) => {
        return [...state, newPost];
    });

    const handleEditorOpen = () => {
        if (imageUrl.trim() !== "" && isImageValid(imageUrl.trim())) {
            setEditorOpen(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    const addEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codesArray: number[] = [];
        sym.forEach((el: string) => codesArray.push(parseInt("0x" + el, 16)));
        let emoji = String.fromCodePoint(...codesArray);
        postInput.setPostText(postInput.postText + emoji);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!ref.current) return;
        const formData = new FormData(ref.current);
        const content = formData.get("content");
        const location = formData.get("location");

        if (!content || !location || !imageUrl) {
            setIsLoading(false);
            return toast({
                title: "Something went wrong",
                description: "All fields are required. Please try again.",
                variant: "destructive",
            });
        }

        addOptimisticPost({
            id: Math.random().toString().slice(25),
            content: content as string,
            audience: audience,
            authorId: session?.user?.id as string,
            location: location as string,
            image: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        formData.set("image", imageUrl);
        formData.set("audience", audience);

        try {
            await createPost(formData);
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
            createPostModal.onClose();
            alertModal.onClose();
            postInput.setPostText("");
            setImageUrl("");
            setTimeout(() => {
                toast({
                    description: "Your post was published! 🎉"
                });
            }, 1000);
        }

        // await createPost(formData)
        //     .then(() => {
        //         ref.current?.reset();
        //         setImageUrl("");
        //         createPostModal.onClose();
        //     })
        //     .catch(() => {
        //         toast({
        //             title: "Something went wrong",
        //             description: "Could not create post. Please try again",
        //             variant: "destructive",
        //             action: <ToastAction altText="Try again" onClick={() => router.refresh()}>Try again</ToastAction>
        //         });
        //     })
        //     .finally(() => {
        //         router.refresh();
        //         setIsLoading(false);
        //         setTimeout(() => {
        //             toast({
        //                 description: "Your post was published! 🎉"
        //             });
        //         }, 1000);
        //     });
    };

    const closeEmojiPicker = () => {
        setShowEmoji(false);
    };

    const handleCloseModal = () => {
        if (pending || isLoading) return;
        if (postInput.postText.length || imageUrl) {
            alertModal.onOpen();
            createPostModal.onOpen();
            return;
        }
        createPostModal.onClose();
        setError(false);
        postInput.setPostText("");
        setImageUrl("");
        router.refresh();
    };

    useOnClickOutside(emojiRef, closeEmojiPicker);


    return (
        <Dialog open={createPostModal.isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className={cn(
                "lg:h-[500px] min-h-screen md:min-h-[400px] lg:max-w-2xl w-full select-none overflow-hidden",
                // editorOpen && selectedFilesURL.length < 1 ? "lg:max-w-2xl !z-50 opacity-0" : "lg:max-w-5xl opacity-100 z-[110"
                // selectedFilesURL.length === 0 ? "lg:max-w-2xl" : "lg:max-w-2xl",
                editorOpen ? "lg:max-w-5xl" : "lg:max-w-2xl",
                (editorOpen && imageUrl.length >= 1) && "lg:min-h-[550px]"
            )}>
                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-full h-full"
                >
                    {!editorOpen && (
                        <div className="flex flex-col items-center space-y-1.5 text-center w-full h-full">
                            <DialogTitle className="flex items-center justify-center w-full py-4 md:pb-2 mx-auto text-center">
                                <span className="text-center">
                                    Create new post
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
                                    Add image to your post
                                </p>
                                <div className="relative flex items-center justify-center w-full max-w-md mx-auto mt-4 select-none">
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
                                    <div className="relative flex flex-col items-center w-full h-full select-none md:flex-row">
                                        <div className={cn(
                                            "relative h-full overflow-hidden flex items-start",
                                            editorOpen ? "w-full md:w-[65%]" : "md:w-full"
                                        )}>
                                            {imageUrl && (
                                                <div className="absolute inset-0 w-full h-full rounded-lg select-none" onClickCapture={() => false}>
                                                    <div className="relative w-full h-full">
                                                        <canvas className="absolute inset-0 w-full h-full rounded-lg select-none" />
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={imageUrl}
                                                                alt="Image"
                                                                unoptimized
                                                                width={1000}
                                                                height={1000}
                                                                draggable={false}
                                                                onDrag={() => false}
                                                                className="object-cover w-full h-full rounded-lg select-none"
                                                            />
                                                        </div>
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
                                                                                    createPostModal.onOpen();
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
                                                                                    alertModal.onOpen();
                                                                                    setEditorOpen(false);
                                                                                }}
                                                                            // className="w-7 h-7"
                                                                            // className="absolute top-2 right-2"
                                                                            >
                                                                                <X className="w-4 h-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
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
                                            <div className="relative flex flex-col items-start w-full md:w-[35%] h-full mt-6 sm:mt-0">
                                                <div className="flex flex-col items-end justify-between w-full h-full pl-2 flex-">
                                                    <div className="flex flex-col items-center justify-start flex-1 w-full h-full mt-1">
                                                        <div className="flex items-center justify-start w-full pt-1 pb-2">
                                                            <UserAvatar user={session?.user!} />
                                                            <div className="flex items-start ml-2">
                                                                <span className="text-sm font-medium capitalize text-slate-800">
                                                                    {session?.user?.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-start w-full pl-1">
                                                            <div className="flex items-center w-full">
                                                                <Textarea
                                                                    name="content"
                                                                    disabled={pending || isLoading}
                                                                    value={postInput.postText}
                                                                    onChange={(e) => postInput.setPostText(e.target.value)}
                                                                    placeholder="Write a caption..."
                                                                    className="w-full border-none px-0 min-h[110px] max-h-52 h-full focus-visible:ring-0 focus-visible:ring-transparent"
                                                                />
                                                            </div>
                                                            <div className="relative flex items-center justify-between w-full py-1">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button type="button" size="xxs" variant="ghost" onClick={() => setShowEmoji((prev) => !prev)}>
                                                                                <Smile className="w-5 h-5 text-gray-700 cursor-pointer" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="start">
                                                                            <p>Pick emoji</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button type="button" size="xxs" variant="ghost">
                                                                                <CalendarClock className="w-5 h-5 text-gray-700 cursor-pointer" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="end">
                                                                            <p>Schedule post</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                            {showEmoji && (
                                                                <div ref={emojiRef} className='hidden sm:flex absolute top-12 -left-20 sm:top-14 sm:left-3 shadow-2xl shadow-neutral-800/50 z-[100]'>
                                                                    <Picker
                                                                        onEmojiSelect={addEmoji}
                                                                        data={data}
                                                                        theme="light"
                                                                        disabled={pending}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="w-full h-[0.5px] bg-border" />
                                                            <div className="relative flex items-center w-full py-1 mt-2">
                                                                <div className="w-full flex items-center justify-center gap-x-0.5">
                                                                    <Input
                                                                        type="text"
                                                                        name="location"
                                                                        disabled={pending || isLoading}
                                                                        placeholder="Add location"
                                                                        className="w-full px-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                                    />
                                                                    <Button type="button" size="xxs" variant="ghost" className="hover:bg-transparent">
                                                                        <MapPin className="w-5 h-5 text-gray-700 cursor-pointer" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="w-full h-px bg-border" />
                                                            <div className="relative flex items-center justify-between w-full py-4 pr-2">
                                                                <Label htmlFor="audience" className="font-normal">
                                                                    <span className='text-sm text-slate-600'>
                                                                        Visibility Options
                                                                    </span>
                                                                </Label>
                                                                <Switch
                                                                    id="audience"
                                                                    name="audience"
                                                                    title={audience === 'PUBLIC' ? 'Public' : 'Private'}
                                                                    disabled={pending || isLoading}
                                                                    checked={audience === "PRIVATE"}
                                                                    onClick={() => setAudience(audience === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-end justify-end p-1 mt-aut flex-">
                                                        <Button
                                                            type="submit"
                                                            size="default"
                                                            isLoading={isLoading}
                                                            disabled={!postInput.postText || isLoading}
                                                            className={cn(
                                                                "ml-auto w-full lg:w-max",
                                                                isLoading && "opacity-50 cursor-not-allowed"
                                                            )}
                                                        >
                                                            Post
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

export default CreatePostModal
