import { deleteOldStories } from "@/actions";

const startScheduler = () => {
    const scheduler = () => {
        deleteOldStories();
        setTimeout(scheduler, 1000 * 60 * 60 * 24); // Run every hour
    };

    scheduler();
};

export default startScheduler;
