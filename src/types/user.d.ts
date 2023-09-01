import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Post, Story, Like, Bookmark, Comment, ProfileView } from '@prisma/client'

type UserId = string

export type ExtendedUser = User & {
    id: UserId
    username?: string | null
    bio?: string | null
    coverImage?: string | null
    profileImage?: string | null
    followingIds?: UserId[]
    followersIds?: UserId[]
    posts: Post[] & {
        likes: Like[];
        bookmarks: Bookmark[];
    }[];
    likes: Like[];
    bookmarks: Bookmark[];
    comments: Comment[];
    story: Story[];
    profile: ProfileView[];
}