import { z } from 'zod'



export const variantSchema = z.object({
  color: z.string().trim().min(1, { message: "Color is required." }),

  size: z.string().trim().optional(),

  price: z.string({ invalid_type_error: "Price must be a number." }).regex(/^[0-9]+$/, { message: "Price must be number" }),

  stock: z
    .string({ invalid_type_error: "Stock must be a number." })
    .regex(/^[0-9]+$/, { message: "Stock must be number" }),

  availability: z.boolean().optional(),

  packageWeight: z
    .string({ invalid_type_error: "Package weight must be a number." })
    .regex(/^[0-9]+$/, { message: "Package weight must be number" }),

  packageLength: z
    .string()
    .trim()
    .optional(),

}).strict().superRefine((data, ctx) => {
  const price = Number(data.price);
  const stock = Number(data.stock);
  const packageWeight = Number(data.packageWeight);

  if (isNaN(price) || price <= 0) {
    ctx.addIssue({
      path: ["price"],
      code: z.ZodIssueCode.custom,
      message: "Price must be greater than 0.",
    });
  }

  if (isNaN(stock) || stock < 0) {
    ctx.addIssue({
      path: ["stock"],
      code: z.ZodIssueCode.custom,
      message: "Stock must be greater than or equal to 0.",
    });
  }

  if (isNaN(packageWeight) || packageWeight < 1) {
    ctx.addIssue({
      path: ["packageWeight"],
      code: z.ZodIssueCode.custom,
      message: "Package weight must be greater than or equal to 1.",
    });
  }
});


export type VariantSchemaType = z.infer<typeof variantSchema>


const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const imageFile = z.instanceof(File).refine(
  (file) => allowedImageTypes.includes(file.type),
  { message: "Only .jpeg, .jpg, .png images are allowed" }
);

export const updateVariantSchema = z.object({
  color: z.string().trim().min(1, { message: "Color is required." }).optional(),

  size: z.string().trim().optional(),

  price: z
    .string({ invalid_type_error: "Price must be a number." })
    .regex(/^[0-9]+$/, { message: "Price must be number" })
    .optional(),

  stock: z
    .string({ invalid_type_error: "Stock must be a number." })
    .regex(/^[0-9]+$/, { message: "Stock must be number" })
    .optional(),

  availability: z.boolean().optional(),

  packageWeight: z
    .string({ invalid_type_error: "Package weight must be a number." })
    .regex(/^[0-9]+$/, { message: "Package weight must be number" })
    .optional(),

  packageLength: z.string().trim().optional(),

  variantImages: z
    .array(imageFile).optional().default([]),
})
  .strict()
  .superRefine((data, ctx) => {
    if (data.price !== undefined) {
      const price = Number(data.price);
      if (isNaN(price) || price <= 0) {
        ctx.addIssue({
          path: ["price"],
          code: z.ZodIssueCode.custom,
          message: "Price must be greater than 0.",
        });
      }
    }

    if (data.stock !== undefined) {
      const stock = Number(data.stock);
      if (isNaN(stock) || stock < 0) {
        ctx.addIssue({
          path: ["stock"],
          code: z.ZodIssueCode.custom,
          message: "Stock must be greater than or equal to 0.",
        });
      }
    }

    if (data.packageWeight !== undefined) {
      const packageWeight = Number(data.packageWeight);
      if (isNaN(packageWeight) || packageWeight < 1) {
        ctx.addIssue({
          path: ["packageWeight"],
          code: z.ZodIssueCode.custom,
          message: "Package weight must be greater than or equal to 1.",
        });
      }
    }
  });


type UpdateVariantSchemaType = z.infer<typeof updateVariantSchema>

export interface UpdateVariant extends UpdateVariantSchemaType{
  imageUrl: string
}
