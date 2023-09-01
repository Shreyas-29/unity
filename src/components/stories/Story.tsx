"use client";

import { FC, useState } from "react";

interface StoryProps {
    stories: {
        id: number;
        image: string;
        name: string;
    }[];
    story: {
        id: number;
        image: string;
        name: string;
    };
    index: number;
}

const Story: FC<StoryProps> = ({ stories, story, index }) => {

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handlePrevSlide = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleNextSlide = () => {
        setCurrentSlide(currentSlide + 1);
    };

    return (
        <>

            <button
                className="ml-4 text-2xl text-gray-500"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
            >
                &lt;
            </button>
            <button
                className="mr-4 text-2xl text-gray-500"
                onClick={handleNextSlide}
                disabled={currentSlide === stories.length - 1}
            >
                &gt;
            </button>
        </>
    );
}

export default Story;