import { Button, Label, Switch } from '@/components';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function UserViewPage({
    params
}: {
    params: { userId: string }
}) {

    return (
        <div className="relative flex flex-col items-start justify-start w-full h-full p-8 mx-auto md:ml-32 lg:ml-0 lg:p-8 md:px-4">
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
                    What you see
                </h2>
            </div>
            <div className="flex flex-col items-start justify-start w-full h-full gap-2">
                <div className="flex items-center justify-start w-full my-4">
                    <span>Likes and reviews</span>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Label htmlFor="likes">
                        <span className="font-medium text-slate-800">
                            Hide likes and view counts
                        </span>
                    </Label>
                    <Switch id="likes" />
                </div>
                <div className="flex flex-wrap items-start mt-4 text-start">
                    <p className="max-w-full text-xs text-gray-600 text-start">
                        You won&apos;t see the total number of likes and views on posts from other accounts. You can hide like and view counts on your own posts when you create them by going to Advanced settings and turning on Hide like and view counts on this post.
                    </p>
                </div>
            </div>
        </div>
    )
}
