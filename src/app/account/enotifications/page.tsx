import { Button, Label, RadioGroup, RadioGroupItem, Switch } from '@/components';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function UserEmailNotificationsPage({
    params
}: {
    params: { userId: string }
}) {

    return (
        <div className="relative flex flex-col items-start justify-start w-full h-full mx-auto md:ml-32 lg:ml-0 lg:p-8 md:px-4">
            <div className="flex items-center justify-start w-full pt-12 pb-2 my-4 lg:hidden">
                <Link href="/account">
                    <Button variant="outline" size="md" className="bg-transparent">
                        <ChevronLeft className="w-5 h-5 mr-1 text-current" />
                        <span>Back</span>
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-start w-full mt-6">
                <h2 className="text-xl font-semibold text-slate-900 lg:text-2xl">
                    Email Notifications
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
                        Feedback and updates
                    </span>
                    <RadioGroup defaultValue="From Everyone" className="mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="n1" />
                            <Label htmlFor="n1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="n2" />
                            <Label htmlFor="n2">On</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex flex-col items-start w-full">
                    <span className="text-sm text-slate-500">
                        Reminder emails
                    </span>
                    <RadioGroup defaultValue="From Everyone" className="mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="n1" />
                            <Label htmlFor="n1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="n2" />
                            <Label htmlFor="n2">On</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex flex-col items-start w-full">
                    <span className="text-sm text-slate-500">
                        News and offers
                    </span>
                    <RadioGroup defaultValue="From Everyone">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="off" id="n1" />
                            <Label htmlFor="n1">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="n2" />
                            <Label htmlFor="n2">On</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}
