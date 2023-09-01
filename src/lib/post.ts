import { z } from 'zod';

export const PostSchema = z.object({
    content: z.string().min(1).max(1000),
    image: z.string().min(1).max(1000),
    location: z.string().min(1).max(20),
    audience: z.enum(['PUBLIC', 'PRIVATE']).optional(),
});

export type PostValues = z.infer<typeof PostSchema>;