import { ExtendedPost } from "@/types/post";
import Image from "next/image";
import { FC } from "react";

interface UserTagsProps {
    posts: ExtendedPost[] | null;
}

const UserTags: FC<UserTagsProps> = ({
    posts
}) => {
    return (
        // TODO: Add a grid here to show the tags
        <div className="flex flex-col items-center justify-center w-full py-4 mx-auto">
            <div className="flex items-center justify-center w-full mt-4">
                <Image
                    src="/svg/user.svg"
                    alt=""
                    width={50}
                    height={50}
                    className="object-cover w-16 h-16"
                />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Photos for you
            </h2>
            <p className="mt-4 text-sm text-slate-500">
                When people tag you in photos, they will appear here.
            </p>
        </div>
    );
}

export default UserTags;