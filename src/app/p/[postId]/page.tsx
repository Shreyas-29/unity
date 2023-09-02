import { Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';

export default async function PostPage({
    params
}: {
    params: { postId: string }
}) {

    const session = await getAuthSession();

    return (
        <div className="flex max-w-lg mx-auto h-full md:pt-16 relative md:px-4">
            <Sidebar session={session} />
            <section className='h-full mx-auto flex items-center justify-center w-full px-4'>
                Post content
            </section>
        </div>
    )
}
