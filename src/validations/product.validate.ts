import { z } from "zod";
import { variantSchema } from "@/validations/variants.validate";

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const imageFile = z.instanceof(File).refine(
  (file) => allowedImageTypes.includes(file.type),
  { message: "Only .jpeg, .jpg, .png images are allowed" }
);

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Product name must be at least 5 characters long." })
    .max(250, { message: "Product name must be less than 250 characters." }),

  category: z
    .string({ required_error: "Category is required." })
    .trim()
    .min(1, { message: "At least one category is required." }),

  productDescription: z
    .string()
    .trim()
    .optional(),

  productHighlights: z
    .string()
    .trim()
    .optional(),
    
  variantImages: z
        .array(imageFile)
        .min(1, "Upload one image per variant."),

  variants: z
    .array(variantSchema)
    .min(1, { message: "At least one variant is required." }),
    
  dangerousGoods: z.string().optional(),
    
  warrantyType: z.string().optional(),
    
  warrantyPeriod: z
    .string({ invalid_type_error: "Warranty period is Required" })
    .min(0, { message: "Warranty period cannot be negative." })
    .max(18, { message: "Warranty period must not exceed 18 months." }),
    
  warrantyPolicy: z.string().trim().optional(),
  }).strict().superRefine((data, ctx) => {
    const warrantyPeriod = Number(data.warrantyPeriod);

    if (warrantyPeriod < 0) {
      ctx.addIssue({
        path: ["warrantyPeriod"],
        code: z.ZodIssueCode.custom,
        message: "Warranty Period cannot be negative.",
      });
    }

    if(warrantyPeriod > 18){
      ctx.addIssue({
        path: ['warrantyPeriod'],
        code: z.ZodIssueCode.custom,
        message: "Warranty period must not excedd 18 months"
      })
    }

  });

export type ProductSchemaType = z.infer<typeof productSchema>


export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Product name must be at least 5 characters long." })
    .max(250, { message: "Product name must be less than 250 characters." })
    .optional(),

  category: z
    .string({ required_error: "Category is required." })
    .trim()
    .min(1, { message: "At least one category is required." })
    .optional(),

  productDescription: z
    .string()
    .trim()
    .optional(),

  productHighlights: z
    .string()
    .trim()
    .optional(),
    
  variantImages: z
        .array(imageFile)
        .min(1, "Upload one image per variant.").optional(),

  variants: z
    .array(variantSchema)
    .min(1, { message: "At least one variant is required." }).optional(),
    
  dangerousGoods: z.string().optional(),
    
  warrantyType: z.string().optional(),
    
  warrantyPeriod: z
    .string({ invalid_type_error: "Warranty period is Required" })
    .min(0, { message: "Warranty period cannot be negative." })
    .max(18, { message: "Warranty period must not exceed 18 months." }).optional(),
    
  warrantyPolicy: z.string().trim().optional(),
  }).strict().superRefine((data, ctx) => {
    const warrantyPeriod = Number(data.warrantyPeriod);

    if (warrantyPeriod < 0) {
      ctx.addIssue({
        path: ["warrantyPeriod"],
        code: z.ZodIssueCode.custom,
        message: "Warranty Period cannot be negative.",
      });
    }

    if(warrantyPeriod > 18){
      ctx.addIssue({
        path: ['warrantyPeriod'],
        code: z.ZodIssueCode.custom,
        message: "Warranty period must not excedd 18 months"
      })
    }

  });