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
    deletePost: (postId: string) => Promise<void>;
}

const GeneralFeed: FC<GeneralFeedProps> = ({
    session,
    user,
    posts,
    stories,
    like,
    bookmark,
    deletePost
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
                                deletePost={deletePost}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GeneralFeed;