import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const getUsers = async () => {
    try {

        const session = await getAuthSession();

        const allUsers = await db.user.findMany();

        const users = allUsers?.filter((user) => user.id !== session?.user?.id);

        return users;

    } catch (error) {
        console.log(error);
        return null;
    }
};


export default getUsers;