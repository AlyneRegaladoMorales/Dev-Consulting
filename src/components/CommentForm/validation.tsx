import { z } from "zod";

export const commentValidation = z.object({
  comment: z
    .string()
    .min(5, "El comentario debe tener al menos 5 caracteres"),
  authorName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no debe superar los 100 caracteres"),
  email: z
    .string()
    .email("Debe ingresar un correo electrónico válido"),
  country: z
    .string()
    .or(z.literal("")), 
  age: z
    .number({
      error: "La edad debe ser un número válido",
    })
    .min(10, "La edad debe ser mayor de 10 años")
});

export type CommentFormData = z.infer<typeof commentValidation>;
