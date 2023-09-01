import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const getViewCount = async (days: number, userId: string) => {
    "use server";

    try {

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - days || 0);

        const session = await getAuthSession();

        const views = await db.profileView.findMany({
            where: {
                userId,
                visitedAt: {
                    gte: startDate,
                    lte: currentDate
                },
            },
            select: {
                visitedAt: true,
                count: true,
            }
        });

        const profileViewData = views?.map((view) => ({
            day: view.visitedAt.toISOString().split("T")[0],
            count: view.count,
        }))

        return profileViewData;

    } catch (error) {
        console.log("Unable to fetch posts", error);
        return [];
    }
};

export default getViewCount;