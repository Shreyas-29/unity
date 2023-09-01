import { User as UserProps } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import UserAvatar from "./UserAvatar";

interface UserNavProps {
    user: Pick<UserProps, 'name' | 'image' | 'email' | 'id'>
}

const UserNav: FC<UserNavProps> = ({
    user
}) => {

    return (
        <div className="flex items-center justify-center">
            <Link href={`/u/${user?.id}`}>
                <div className="flex justify-center items-center gap-2">
                    <UserAvatar
                        user={{
                            name: user.name,
                            image: user.image
                        }}
                        className="w-8 h-8"
                    />
                </div>
            </Link>
        </div>
    );
}

export default UserNav;