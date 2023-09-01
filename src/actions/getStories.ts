import { db } from "@/lib/db";
import { ExtendedStory } from "@/types/story";

const getStories = async () => {
    try {

        const stories = await db.story.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: true,
            }
        });

        return stories as ExtendedStory[];
    } catch (error) {
        console.log("Unable to fetch stories", error);
        return [];
    }
};

export default getStories;