"use server";

import { db } from "@/lib/db";

const profileCount = async (userId: string) => {

    try {

        const profileView = await db.profileView.create({
            data: {
                visitedAt: new Date(),
                userId: userId
            },
        })

        return profileView;

    } catch (error) {
        console.error('Error incrementing profile view count:', error);
        throw error;
    }

};

export default profileCount;