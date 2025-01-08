import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  price: z.number().positive("Price must be a positive number"),
});
