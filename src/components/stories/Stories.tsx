"use client";

import { useCreateStoryModal, useCustomToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { ExtendedStory } from "@/types/story";
import { ExtendedUser } from "@/types/user";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "..";

interface StoriesProps {
    session: Session | null;
    user: ExtendedUser | null;
    stories: ExtendedStory[];
}

const Stories: FC<StoriesProps> = ({
    session,
    stories,
    user
}) => {

    const router = useRouter();

    const createStoryModal = useCreateStoryModal();

    const { authToast } = useCustomToast();

    const userStories = stories?.filter((story) => story.author.id === session?.user?.id);

    const currentUserHasStory = userStories.length > 0;

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showAuthorImage, setShowAuthorImage] = useState<boolean>(!currentUserHasStory);

    const user2 = stories?.filter((story) => story.author.id === session?.user?.id);

    const currentUserStoryAuthors = userStories.map((story) => story.author);

    const userImage = user?.story?.map((story) => story.image);

    // const totalStoriesWidth = stories.length * 60; // Adjust the width per story as needed
    // const visibleWidth = 240; // Adjust the visible width as needed
    // const maxScrollPosition = Math.max(0, totalStoriesWidth - visibleWidth);

    const handlePrevSlide = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleNextSlide = () => {
        setCurrentSlide(currentSlide + 1);
    };

    const handleClickStory = (story: ExtendedStory) => {
        if (!user) {
            router.push(`/s/${story.id}`);
            setShowAuthorImage(false);
            createStoryModal.onClose();
        } else if (user.id !== story.author.id) {
            router.push(`/s/${story.id}`);
            createStoryModal.onClose();
        } else if (user.id === story.author.id) {
            router.push(`/s/${story.id}`);
        } else {
            createStoryModal.onOpen();
        }
    };

    const handleStory = () => {
        if (!user) {
            return authToast();
        } else {
            createStoryModal.onOpen();
        }
    };


    return (
        <div className="flex flex-col items-start w-full py-4">
            <div className="flex-1 w-full mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                    Stories
                </h2>
            </div>
            <div className="relative flex flex-col items-start w-full py-4 bg-white justify-normal rounded-2xl shadow-gray-400/10">
                <div className="flex overflow-hidden">
                    <div
                        className="flex mx-2 transition duration-500 ease-linear transform"
                        style={{ transform: `translateX(-${currentSlide * 70}px)` }}
                    >

                        {showAuthorImage && user?.story.length === 0 ? (
                            <div
                                onClick={() => createStoryModal.onOpen()}
                                className={cn(
                                    "flex flex-col items-center justify-center mx-2 relative last:mr-4 brightness-95 hover:brightness-105 transition-colors select-none cursor-pointer overflow-hidden"
                                )}
                            >
                                <canvas className="absolute inset-0 w-16 h-16 rounded-full" />
                                <div className="flex items-center justify-center w-16 h-16 rounded-full relative overflow-visible">
                                    <Image
                                        src={user?.story?.map((story) => story.image!)[0]
                                            ? userImage?.[0]!
                                            : user?.image!
                                        }
                                        alt=""
                                        width={50}
                                        height={50}
                                        unoptimized
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                    <div className="absolute bottom-0 right-0 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-">
                                        <PlusCircle className="w-5 h-5 fill-primary text-slate-50" />
                                    </div>
                                </div>
                                <p className="mt-1 text-xs truncate text-slate-500">
                                    {user?.name?.slice(0, 8) ?? user?.username}
                                </p>
                            </div>
                        ) : null}

                        {stories?.map((story) => (
                            <div
                                key={story.id}
                                onClick={() => handleClickStory(story)}
                                className={cn(
                                    "flex flex-col items-center justify-center mx-2 relative last:mr-4 brightness-95 hover:brightness-105 transition-colors select-none cursor-pointer overflow-hidden"
                                )}
                            >
                                <canvas className="absolute inset-0 w-16 h-16 rounded-full" />
                                <div className="flex items-center justify-center w-16 h-16 rounded-full">
                                    <Image
                                        // src={story.image === user?.story?.map((story) => story.image!)[0] ? userStoryImage?.[0]! : story.image!}
                                        src={story.image ===
                                            user?.story?.map((story) => story.image!)[0]
                                            ? userImage?.[0]!
                                            : story.image!
                                        }
                                        alt=""
                                        width={50}
                                        height={50}
                                        unoptimized
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </div>
                                <p className="mt-1 text-xs truncate text-slate-500">
                                    {story?.author.name?.slice(0, 8) ?? story?.author.username}
                                </p>
                            </div>
                        ))}

                        {stories?.length === 0 ? (
                            <div
                                onClick={handleStory}
                                className="relative flex flex-col items-center justify-center w-12 h-12 ml-2 overflow-hidden cursor-pointer select-none hover:opacity-90"
                            >
                                <Image
                                    src="/svg/add.svg"
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="object-cover w-10 h-10"
                                />
                            </div>
                        ) : null}

                    </div>
                </div>
                <div className="absolute inset-y-0 flex items-center justify-center left-2">
                    <Button
                        variant="outline"
                        size="xxxs"
                        onClick={handlePrevSlide}
                        disabled={currentSlide === 0}
                        className={cn("z-20 rounded-full shadow", currentSlide === 0 && "hidden")}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </div>
                <div className="absolute inset-y-0 flex items-center justify-center right-2">
                    <Button
                        variant="outline"
                        size="xxxs"
                        onClick={handleNextSlide}
                        disabled={currentSlide >= (stories.length / 2)}
                        className={cn(
                            "z-20 rounded-full shadow",
                            stories?.length <= 6 && "hidden",
                            // currentSlide >= (stories.length / 2) && "hidden",
                        )}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Stories;