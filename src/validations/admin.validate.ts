import {z} from 'zod'

export const updateAdminInfo = z.object({
    fullname: z.string().trim().optional()
}).strict().refine((data)=>Object.keys(data).length > 0, {
    message: "At least one field must be provided to update. Available fields: fullname."
})

export type UpdateAdminInfoType = z.infer<typeof updateAdminInfo>