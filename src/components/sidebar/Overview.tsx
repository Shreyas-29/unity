// import { User } from '@prisma/client';
import { Session, User } from 'next-auth';
import { FC } from 'react';
import { Separator, UserAvatar } from '..';

interface OverviewProps {
    session: Session | null;
    users: User[] | null;
}

const Overview: FC<OverviewProps> = ({
    session,
    users
}) => {

    return (
        <div className="w-full p-4 lg:py-8">
            <div className="flex flex-col items-start gap-y-2 w-full select-none">
                {session?.user && (
                    <div className="flex items-center justify-between flex-1 w-full py-2 px-4 bg-transparent hover:bg-slate-200/50 rounded-md cursor-pointer">
                        <div className="flex items-center justify-start">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full">
                                <UserAvatar user={session?.user!} />
                            </div>
                            <span className="text-sm text-slate-800 font-medium ml-2">
                                {session?.user?.username ?? session?.user?.name}
                            </span>
                        </div>
                        <span className="text-xs font-medium text-slate-900">
                            Account
                        </span>
                    </div>
                )}

                <Separator />

                {users?.map((user) => (
                    <div key={user.id} className="flex items-center justify-start flex-1 w-full py-2 px-4 bg-transparent hover:bg-slate-200/50 rounded-md cursor-pointer">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full">
                            <UserAvatar user={user!} />
                        </div>
                        <span className="text-sm text-slate-800 font-medium ml-2">
                            {user?.name}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Overview
