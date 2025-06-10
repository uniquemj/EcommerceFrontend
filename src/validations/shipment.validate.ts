import {z} from 'zod'

export const addressSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(6, "Full name must be at least 6 characters long.")
    .max(50, "Full name must be at most 50 characters long."),
    
  email: z
    .string()
    .trim()
    .email("Invalid email format."),
    
  phone_number: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Phone number must be exactly 10 digits long and contain only numbers.",
    }),
    
  region: z
    .string()
    .trim()
    .min(2, "Region must be at least 2 characters long.")
    .max(50, "Region must be at most 50 characters long."),
    
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long.")
    .max(50, "City must be at most 50 characters long."),
    
  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters long.")
    .max(100, "Address must be at most 100 characters long."),
});

export type AddressType = z.infer<typeof addressSchema>

export const updateAddressSchema = addressSchema.partial();

export type UpdateAddressType = z.infer<typeof updateAddressSchema>;