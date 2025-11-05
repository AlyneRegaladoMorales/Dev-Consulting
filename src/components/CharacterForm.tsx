import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationCustomCharacter } from "../utils/validationCustomCharacter";
import { z } from "zod";
import Navbar from "../components/Navbar";
import type { ChangeEvent } from "react";

type FormData = z.infer<typeof validationCustomCharacter>;

interface CharacterFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  defaultValues?: Partial<FormData>;
  title: string;
  buttonText: string;
}

const CharacterForm = ({ onSubmit, defaultValues, title, buttonText }: CharacterFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationCustomCharacter),
    defaultValues: {
      ...defaultValues,
      image: defaultValues?.image ?? "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("image", reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 mt-20"
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Nombre</label>
          <input {...register("name")} className="border p-2 w-full rounded" />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Raza</label>
          <input {...register("race")} className="border p-2 w-full rounded" />
          {errors.race && (
            <p className="text-red-600 text-sm">{errors.race.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Ki</label>
          <input {...register("ki")} className="border p-2 w-full rounded" />
          {errors.ki && (
            <p className="text-red-600 text-sm">{errors.ki.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Ki máximo</label>
          <input {...register("maxKi")} className="border p-2 w-full rounded" />
          {errors.maxKi && (
            <p className="text-red-600 text-sm">{errors.maxKi.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 w-full rounded cursor-pointer mb-3"
          />
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Descripción</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full rounded resize-none"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          className={`font-semibold px-4 py-2 rounded-md border transition-colors duration-200
    ${buttonText === "Actualizar"
              ? "bg-green-300 hover:bg-green-400 border-green-500"
              : "bg-blue-300 hover:bg-blue-400 border-blue-500"
            }`}
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default CharacterForm;
