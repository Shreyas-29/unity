import { db } from "@/lib/db";
import { ExtendedStory } from "@/types/story";

const getStoryById = async (storyId: string) => {
    try {

        const story = await db.story.findUnique({
            where: {
                id: storyId,
            },
            include: {
                author: true,
            }
        })

        return story as ExtendedStory;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getStoryById;