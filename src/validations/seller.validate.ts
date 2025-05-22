import { z } from "zod";

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const imageFile = z.instanceof(File).refine(
  (file) => allowedImageTypes.includes(file.type),
  { message: "Only .jpeg, .jpg, .png images are allowed" }
);

export const BusinessInfoSchema = z.object({
  legal_document: z
    .array(imageFile)
    .length(2, "Exactly 2 legal document images are required"),
  store_logo: z
    .array(imageFile)
    .length(1, "Exactly 1 store_logo image is required."),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  phone_number: z
    .string()
    .regex(/^9[0-9]{9}$/, {
      message: "Only numbers are allowed and should be of length 10 and should start from 9.",
    }),
}).strict();

export type BusinessInfoType = z.infer<typeof BusinessInfoSchema>
