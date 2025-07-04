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
    .string({required_error: "Product Description is required."})
    .trim(),
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
    
  dangerousGoods: z.string({required_error: "Required."}),
    
  warrantyType: z.string({required_error: "Required."}),
    
  warrantyPeriod: z
    .string({ invalid_type_error: "Warranty period is Required" })
    .min(0, { message: "Warranty period cannot be negative." })
    .max(18, { message: "Warranty period must not exceed 18 months." }),
    
  warrantyPolicy: z.string({required_error: "Required."}).trim(),
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
        .array(imageFile).optional().default([]),

  variants: z
    .array(variantSchema).optional().default([]),
    
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

    if (data.variants && data.variants.length > 0) {
    data.variants.forEach((variant, index) => {
      if (!variant.color || !variant.price) {
        ctx.addIssue({
          path: ["variants", index],
          code: z.ZodIssueCode.custom,
          message: "Each variant must include at least a color and price.",
        });
      }
    });
  }

  if (data.variantImages && data.variantImages.length > 0) {
    data.variantImages.forEach((image, index) => {
      if (!image || !image.name) {
        ctx.addIssue({
          path: ["variantImages", index],
          code: z.ZodIssueCode.custom,
          message: "Each variant image must be a valid file.",
        });
      }
    });
  }
  });