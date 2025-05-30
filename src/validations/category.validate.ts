import {z} from 'zod'

export const categorySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),
  parent_category: z
    .string()
    .trim()
    .optional(),
}).strict();

export type CategorySchemaType = z.infer<typeof categorySchema>

// Update Category Schema
export const updateCategorySchema = z
  .object({
    title: z.string().trim().optional(),
    parent_category: z.string().trim().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided for update: title, parent_category.",
    }
  );
