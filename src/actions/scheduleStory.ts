import { db } from "@/lib/db";

const deleteOldStories = async () => {

    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48); // Extend to 48 hours

    try {
        await db.story.deleteMany({
            where: {
                createdAt: {
                    lt: fortyEightHoursAgo,
                },
            },
        });

        console.log("Old stories deleted successfully.");
    } catch (error) {
        console.error("Error deleting old stories:", error);
    }
};

export default deleteOldStories;