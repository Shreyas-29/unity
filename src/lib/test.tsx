import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';


export default async function Page() {


    const posts = await db.post.findMany();

    const addPost = async (formData: FormData) => {
        "use server";

        const content = formData.get("content");
        const location = formData.get("location");

        await db.post.create({
            data: {
                content: content as string,
                location: location as string,
                audience: "PUBLIC",
                image: "https://image.lexica.art/full_jpg/822ef249-d7fe-4a1e-b3a4-76486b60233b",
                authorId: Math.random().toString() as string,
            }
        });

        revalidatePath("/");
    };


    return (
        <div className="flex flex-col items-center justify-center max-w-md min-h-screen pt-20 mx-auto">
            <form action={addPost} className="grid w-full grid-cols-1 pt-20 mx-auto gap-y-4">
                <input
                    type="text"
                    name="content"
                    placeholder="Enter caption here..."
                    className="px-4 py-2 border rounded-md outline-none"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Enter caption here..."
                    className="px-4 py-2 border rounded-md outline-none"
                />
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md">
                    Post
                </button>
            </form>
            <div className="py-8 space-y-4">
                {posts?.map((post) => (
                    <div key={post.id} className="flex items-center justify-center w-full gap-2 p-4 border rounded-lg">
                        <span className='font-semibold'>
                            {post.content.slice(0, 40)}...
                        </span>
                        <span className='text-gray-500'>
                            {post.location}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
