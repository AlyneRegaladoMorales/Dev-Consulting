import { z } from "zod";
export const validationCustomCharacter = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    race: z
        .string()
        .nonempty("La raza es obligatoria"),
    ki: z
        .string()
        .nonempty("El ki es obligatorio"),
    maxKi: z
        .string()
        .nonempty("El ki máximo es obligatorio"),
    image: z
        .string()
        .nonempty("La imagen es obligatoria"),
    description: z
        .string()
        .min(5, "La descripción debe tener al menos 5 caracteres"),
});


