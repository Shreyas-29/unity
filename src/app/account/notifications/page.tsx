import { Button, Label, RadioGroup, RadioGroupItem, Sidebar, Switch } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function UserNotificationsPage({
    params
}: {
    params: { userId: string }
}) {

    const session = await getAuthSession();

    return (
        <div className="relative flex flex-col items-start justify-start w-full h-full mx-auto lg:p-8 md:ml-32 lg:ml-0 md:px-4">
            <div className="flex items-center justify-start w-full my-4 lg:hidden">
                <Link href="/account">
                    <Button variant="outline" size="md" className="bg-transparent">
                        <ChevronLeft className="w-5 h-5 mr-1 text-current" />
                        <span>Back</span>
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-start w-full">
                <h2 className="text-xl font-semibold text-slate-900 lg:text-2xl">
                    User Notifications
                </h2>
            </div>
            <div className="grid w-full h-full grid-cols-1">
                <div className="flex items-center justify-between w-full">
                    <Label htmlFor="notifications" >
                        <span className="font-medium text-slate-800">
                            Notifications
                        </span>
                    </Label>
                    <Switch id="notifications" />
                </div>
                <div className="flex flex-col items-start w-full">
                    <span className="text-sm text-slate-500">
                        Likes
                    </span>
                    <RadioGroup defaultValue="From Everyone" className="mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="r1" />
                            <Label htmlFor="r1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friends" id="r2" />
                            <Label htmlFor="r2">Friends</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="from everyone" id="r3" />
                            <Label htmlFor="r3">From Everyone</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex flex-col items-start w-full">
                    <span className="text-sm text-slate-500">
                        Likes and comments on your posts
                    </span>
                    <RadioGroup defaultValue="From Everyone" className="mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="l1" />
                            <Label htmlFor="l1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friends" id="l2" />
                            <Label htmlFor="l2">Friends</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="from everyone" id="l3" />
                            <Label htmlFor="l3">From Everyone</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex flex-col items-start w-full">
                    <span className="text-sm text-slate-500">
                        Comments
                    </span>
                    <RadioGroup defaultValue="From Everyone">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="c1" />
                            <Label htmlFor="c1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friends" id="c2" />
                            <Label htmlFor="c2">Friends</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="from everyone" id="c3" />
                            <Label htmlFor="c3">From Everyone</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}
