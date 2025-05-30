import {z} from 'zod'



export const variantSchema = z.object({
  color: z.string().trim().min(1, { message: "Color is required." }),

  size: z.string().trim().optional(),

  price: z.string({ invalid_type_error: "Price must be a number." }).regex(/^[0-9]+$/, {message: "Price must be number"}),

  stock: z
    .string({ invalid_type_error: "Stock must be a number." })
    .regex(/^[0-9]+$/, {message: "Stock must be number"}),

  availability: z.boolean().optional(),

  packageWeight: z
    .string({ invalid_type_error: "Package weight must be a number." })
    .regex(/^[0-9]+$/, {message: "Package weight must be number"}),

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