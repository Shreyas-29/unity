import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Post } from '@prisma/client'

type UserId = string

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
        username?: string | null
        bio?: string | null
        coverImage?: string | null
        profileImage?: string | null
        followingIds?: UserId[]
        followersIds?: UserId[]
        posts?: Post[]
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId
            username?: string | null
            bio?: string | null
            coverImage?: string | null
            profileImage?: string | null
            followingIds?: UserId[]
            followersIds?: UserId[]
            posts?: Post[]
        }
    }
}