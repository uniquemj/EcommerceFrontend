import { z } from 'zod';

export const updateCustomerProfileSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(6, { message: "Fullname must be at least 6 characters long." })
      .max(50, { message: "Fullname must be at most 50 characters long." })
      .optional(),

    phone_number: z
      .string()
      .regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits.",
      })
      .optional(),

    date_of_birth: z
      .string()
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.values(data).some((value) => value !== undefined && value !== ''),
    {
      message:
        "At least one field must be provided to update. Available fields: fullname, date_of_birth, phone_number.",
    }
  );

export type CustomerProfileUpdateType = z.infer<typeof updateCustomerProfileSchema>