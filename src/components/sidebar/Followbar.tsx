import { getUsers, getViewCount } from '@/actions';
import { getAuthSession } from '@/lib/auth';
import Overview from './Overview';

const Followbar = async () => {

    const session = await getAuthSession();

    const users = await getUsers(session?.user?.id!);

    return (
        <div className='fixed bottom-0 right-0 z-50 hidden w-1/4 h-full pb-24 top-16 lg:px-4 lg:block'>
            <div className='flex flex-col h-full py-4 gap-y-8'>
                <Overview session={session} users={users} />
            </div>
        </div>
    )
}

export default Followbar
