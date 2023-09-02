import { Button, Checkbox, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, UserAvatar } from "@/components";
import { getAuthSession } from "@/lib/auth";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AccountPage({
    params
}: {
    params: { userId: string }
}) {

    const session = await getAuthSession();

    return (
        <div className="relative flex flex-col items-start justify-start w-full h-full mx-auto md:px-4 lg:p-8">
            <div className="flex items-center justify-start w-full pt-12 pb-2 my-4 md:justify-center lg:hidden">
                <Link href="/account">
                    <Button variant="outline" size="md" className="bg-transparent">
                        <ChevronLeft className="w-5 h-5 mr-1 text-current" />
                        <span>Back</span>
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-start w-full mt-6 md:justify-center">
                <h2 className="text-xl font-semibold text-slate-900 lg:text-2xl">
                    Edit Profile
                </h2>
            </div>
            <form className="flex flex-col items-start justify-center w-full py-8">
                <div className="grid items-start justify-start w-full grid-cols-8 gap-7">
                    <div className="flex flex-col items-center justify-start h-full col-span-3">
                        <div className="flex items-center justify-end w-full">
                            <UserAvatar user={session?.user!} />
                        </div>
                        <div className="flex items-center justify-end w-full mt-8">
                            <span className="text-sm font-medium text-slate-800">
                                Website
                            </span>
                        </div>
                        <div className="flex items-center justify-end w-full mt-12">
                            <span className="text-sm font-medium text-slate-800">
                                Bio
                            </span>
                        </div>
                        <div className="flex items-center justify-end w-full mt-[6.5rem]">
                            <span className="text-sm font-medium text-slate-800">
                                Gender
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-end w-full mt-6">
                            <span className="flex-wrap text-sm font-medium text-slate-800">
                                Show your account
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start h-full col-span-5 gap-y-4">
                        <div className="flex flex-col items-start justify-start w-full space-y-1">
                            <span className="text-xs text-slate-500">
                                {session?.user.username ?? session?.user.email}
                            </span>
                            <span className="text-sm text-slate-800">
                                Change your profile photo
                            </span>
                        </div>
                        <div className="w-full p-1">
                            <Input
                                type="text"
                                name="website"
                                placeholder="Website"
                                className="w-full bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full p-1">
                            <Textarea
                                name="bio"
                                placeholder="Bio"
                                className="w-full bg-transparent resize-none min-h-[80px]"
                            />
                            <span className="mt-1 text-xs text-slate-500">
                                0 / 160
                            </span>
                        </div>
                        <div className="flex flex-col items-start w-full p-1">
                            <Select>
                                <SelectTrigger className="w-[180px] shadow-none">
                                    <SelectValue placeholder="Male" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100 shadow-none">
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="none">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-start w-full gap-2 p-1">
                            <Checkbox type="button" id="profile" />
                            <Label htmlFor="profile" className="text-sm font-normal leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Choose whether to show your account suggestions in search results. {" "}
                                <Link href="/account/help" className="text-slate-800">Learn more</Link>
                            </Label>
                        </div>
                    </div>
                </div>
                <Button className="mx-auto mt-4 w-max">
                    Submit
                </Button>
            </form>
        </div>
    )
}
