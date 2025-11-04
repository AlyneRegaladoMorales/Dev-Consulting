import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCommentMutation } from "../../api/commentApi";
import { commentValidation } from "./validation";
import type { CommentFormData } from "./validation";
import { useForm } from "react-hook-form";

interface CommentFormProps {
  characterId: number;
}

const CommentForm = ({ characterId }: CommentFormProps) => {
  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CommentFormData>({
    mode: "onChange",
    resolver: zodResolver(commentValidation),
  });

  const onSubmit = async (data: CommentFormData) => {
    try {
      await createComment({
        characterId: characterId,
        authorName: data.authorName,
        email: data.email,
        country: data.country,
        age: data.age,
        comment: data.comment,
      }).unwrap();
      reset();
    } catch (error) {
      console.error("Error al crear comentario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-10 border-t pt-9">
      <div>
        <input
          {...register("authorName")}
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Tu nombre"
        />
        {errors.authorName && (
          <p className="text-red-600 text-sm">{errors.authorName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          className="border rounded p-2 w-full"
          placeholder="Correo electrónico"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("country")}
          type="text"
          className="border rounded p-2 w-full"
          placeholder="País"
        />
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          className="border rounded p-2 w-full"
          placeholder="Edad"
        />
        {errors.age && (
          <p className="text-red-600 text-sm">{errors.age.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("comment")}
          className="border rounded p-2 w-full resize-none"
          placeholder="Escribe tu comentario..."
        />
        {errors.comment && (
          <p className="text-red-600 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPosting || isSubmitting || !isValid}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPosting ? "Publicando..." : "Publicar comentario"}
      </button>
    </form>
  );
};

export default CommentForm;
