import { useState, type FormEvent } from "react";
import { useCreateCommentMutation, useGetCommentsByPersonIdQuery } from "../api/commentApi";


interface CommentsProps {
  characterId: number;
}

const Comments = ({ characterId }: CommentsProps) => {
  const { data: comments = [], isLoading, isError } = useGetCommentsByPersonIdQuery(characterId);
  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();

  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await createComment({ characterId, comment: commentText }).unwrap();
      setCommentText("");
    } catch (error) {
      console.error("Error al crear comentario:", error);
    }
  };

  if (isLoading) return <p className="text-gray-500">Cargando comentarios...</p>;
  if (isError) return <p className="text-red-600">Error al cargar comentarios.</p>;

  return (
    <section className="mt-10 border-t pt-6">
      <h2 className="text-xl font-bold mb-3">Comentarios</h2>

      <div className="space-y-3 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">Aún no hay comentarios. ¡Sé el primero!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800 text-sm">{c.comment}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border rounded p-2 resize-none"
          placeholder="Escribe tu comentario sobre este personaje..."
          required
        />
        <button
          type="submit"
          disabled={isPosting}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPosting ? "Publicando..." : "Publicar comentario"}
        </button>
      </form>
    </section>
  );
};

export default Comments;
