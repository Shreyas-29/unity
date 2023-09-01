import { ExtendedPost } from "@/types/post";
import { ExtendedStory } from "@/types/story";
import { ExtendedUser } from "@/types/user";
import { ChevronDown } from "lucide-react";
import { Session } from "next-auth";
import { FC } from "react";
import { Button, PostFeed, Stories } from "..";

interface GeneralFeedProps {
    session: Session | null;
    user: ExtendedUser | null;
    posts: ExtendedPost[];
    stories: ExtendedStory[];
    like: (postId: string, userId: string) => Promise<boolean | void>;
    bookmark: (postId: string, userId: string) => Promise<boolean | void>;
}

const GeneralFeed: FC<GeneralFeedProps> = async ({
    session,
    user,
    posts,
    stories,
    like,
    bookmark
}) => {

    return (
        <section className="flex-1 w-full h-full px-4 mx-auto">
            <div className="w-full h-full mx-auto">
                <div className="flex flex-col items-center max-w-full">
                    <Stories session={session} stories={stories} user={user} />
                </div>
                <div className="flex flex-col items-center w-full pb-8">
                    {/* <PostFeed initialPosts={posts} session={session} /> */}
                    <div className="flex flex-col items-center justify-center w-full">
                        {posts?.length !== 0 ? (
                            <div className="flex items-center justify-between flex-1 w-full">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Feed
                                </h2>
                                <Button variant="ghost" size="sm">
                                    <span>Favorites</span>
                                    <ChevronDown className="w-4 h-4 ml-1 text-current" />
                                </Button>
                            </div>
                        ) : null}
                        <div className="flex flex-col w-full mt-4 space-y-8">
                            {posts?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        No posts yet
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        When someone posts something, you&apos;ll see it here.
                                    </p>
                                </div>
                            ) : null}

                            <PostFeed
                                session={session}
                                posts={posts}
                                like={like}
                                bookmark={bookmark}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GeneralFeed;
{/* <ul className="grid w-full max-w-lg grid-cols-1 mx-auto">
    {posts?.map((post) => (
        <li key={post.id} className="flex items-center justify-start w-full gap-2 p-4 border rounded-lg">
            <img src={post.image} alt="" className="object-cover w-20 h-20 rounded-md" />
            <span>
                {post.content.slice(0, 40)}...
            </span>
        </li>
    ))}
</ul> */}