import { getStoryById } from '@/actions';
import { Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { Session } from 'next-auth';

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
            <section className='flex-1 w-full h-full px-4 mx-auto'>
                <div className='flex flex-col items-center justify-center w-full h-full mx-auto'>
                    Story
                </div>
            </section>
        </div>
    )
}
