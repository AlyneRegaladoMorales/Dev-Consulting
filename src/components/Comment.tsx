import { useState, type FormEvent } from "react";
import { useCreateCommentMutation, useGetCommentsByPersonIdQuery } from "../api/commentApi";
import CommentForm from "./CommentForm/CommentForm";


interface CommentsProps {
  characterId: number;
}

const Comments = ({ characterId }: CommentsProps) => {
  const { data: comments = [], isLoading, isError } = useGetCommentsByPersonIdQuery(characterId);

  if (isLoading) return <p className="text-gray-500">Cargando comentarios...</p>;
  if (isError) return <p className="text-red-600">Error al cargar comentarios.</p>;

  return (
    <section className="mt-10 border-t pt-9">
      <h2 className="text-xl font-bold mb-3">Comentarios</h2>

      <div className="space-y-3 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">Aún no hay comentarios. ¡Sé el primero!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-3 bg-gray-50 rounded-lg border">
              <p className="font-bold">{c.authorName} | {c.country}</p>
              <p className="text-gray-800 text-sm">{c.comment}</p>
            </div>
          ))
        )}
      </div>

      <CommentForm characterId={characterId} />
    </section>
  );
};

export default Comments;
