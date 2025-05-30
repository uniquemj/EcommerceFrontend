import {z} from 'zod'


export const adminRegisterSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long"),

  lastname: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long"),


  username: z
    .string()
    .trim()
    .min(5, "Username must be at least 5 characters long"),
    
  email: z
    .string()
    .email("Invalid email address"),

  isSuperAdmin: z.boolean({
    required_error: "isSuperAdmin must be specified",
  }),

  password: z
    .string()
    .min(5, "Password must be at least 5 characters long"),
});

export type AdminRegisterType = z.infer<typeof adminRegisterSchema>
export const updateAdminInfo = z.object({
    fullname: z.string().trim().optional()
}).strict().refine((data)=>Object.keys(data).length > 0, {
    message: "At least one field must be provided to update. Available fields: fullname."
})

export type UpdateAdminInfoType = z.infer<typeof updateAdminInfo>


export const updateNormalAdminInfoSchema = z
  .object({
    fullname: z.string().trim().min(1, "Fullname cannot be empty").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    isSuperAdmin: z.boolean().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "At least one field must be provided. Available fields: fullname, password, isSuperAdmin.",
    }
  );

export type UpdateNormalAdminType = z.infer<typeof updateNormalAdminInfoSchema>