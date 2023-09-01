import { Avatar, AvatarFallback } from "@/components";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import Image from "next/image";
import { FC } from "react";

interface UserAvatarProps extends AvatarProps {
    user: User | any;
    width?: string;
    height?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
    user,
    width,
    height,
    ...props
}) => {
    return (
        <Avatar
            {...props}
            className={cn(
                "cursor-pointer w-9 h-9",
                width && width, height && height
            )}
            style={{
                width: width ? width : "2.25rem",
                height: height ? height : "2.25rem"
            }}
        >
            {user?.image !== null ? (
                <div className="relative w-full h-full aspect-square">
                    <Image
                        src={user?.image!}
                        alt={user?.name!}
                        referrerPolicy="no-referrer"
                        width={500}
                        height={500}
                    />
                </div>
            ) : (
                <AvatarFallback>
                    {user?.name?.charAt(0)}
                </AvatarFallback>
            )}
        </Avatar>
    );
}

export default UserAvatar;