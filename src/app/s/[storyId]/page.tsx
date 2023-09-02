import { deleteStory, getStoryById } from '@/actions';
import { Sidebar } from '@/components';
import { Button, buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { Trash } from 'lucide-react';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default async function UserPage({
    params
}: {
    params: { storyId: string }
}) {

    const session: Session | null = await getAuthSession();

    const story = await getStoryById(params?.storyId);


    return (
        <div className="relative flex w-full h-full mx-auto md:pt-16 md:px-4">
            <Sidebar session={session} border={true} />
            <section className='flex flex-col items-center justify-center w-full h-full mx-auto border rounded-2xl border-slate-100 p-5 lg:px-8 lg:py-20 min-h-full py-20 lg:min-h-[500px] lg:max-w-md select-none overflow-hidden'>
                <div className="absolute flex items-center justify-start w-full top-24 left-10 lg:left-80 lg:top-20">
                    <Link href="/" className={buttonVariants({ variant: "outline", size: "md" })}>
                        Back
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full lg:h-[500px]">
                    {session?.user.id === story?.author.id && (
                        <div className="absolute flex items-center justify-center top-24 right-10 lg:right-80 lg:top-20">
                            <DeleteButton storyId={story?.id!} delete={deleteStory} />
                        </div>
                    )}
                    <Image
                        src={story?.image!}
                        alt="Image"
                        unoptimized
                        width={1000}
                        height={1000}
                        draggable={false}
                        className="object-cover w-full h-full rounded-lg select-none"
                    />
                    <p className="mt-5 text-sm text-slate-800">
                        {story?.content} by {" "}
                        <Link href={`/u/${story?.author?.id}`} className="text-sm font-medium transition-all hover:text-slate-900 text-slate-500">
                            {story?.author.username ?? story?.author.name}
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
