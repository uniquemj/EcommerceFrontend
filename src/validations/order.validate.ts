import {z} from 'zod'

export const returnInitializeSchema = z.object({
    return_reason: z.string().min(10, {message: "Reason must be at least 10 words."}).max(150, {message: "Reason must be at most 150 words."})
}).strict()


export type ReturnInitializeType = z.infer<typeof returnInitializeSchema>