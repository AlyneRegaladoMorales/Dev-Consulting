import { Link, useNavigate } from "react-router-dom";
import type { Character } from "../model/Character";
import { useDeleteCustomCharacterMutation } from "../api/customCharacter";
import useToast from "../hook/useToast";

interface CardProps {
  character: Character;
  isCustom?: boolean;
}

const Card = ({ character, isCustom = false }: CardProps) => {
  
  const navigate = useNavigate();
  const [deleteCharacter] = useDeleteCustomCharacterMutation();
  const { showToast } = useToast();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deleteCharacter(character.id!).unwrap();
      showToast("¡Personaje eliminado!", "success");
    } catch {
      showToast("Error al eliminar personaje", "error");
    }
  };

  const detailLink = isCustom
    ? `/custom/${character.id}`
    : `/character/${character.id}`;

  return (
    <div
      className="rounded-2xl border bg-white/80 p-4 shadow-sm backdrop-blur
                 hover:shadow-lg transition hover:scale-[1.03]"
    >
      <Link to={detailLink}>
        <div className="flex flex-col items-center text-center">
          <img
            src={character.image}
            alt={character.name}
            className="mx-auto h-40 w-auto rounded-xl object-cover"
            loading="lazy"
          />
          <h3 className="mt-3 text-base font-bold text-gray-800">
            {character.name}
          </h3>
          <p className="text-xs text-gray-600">{character.race || "—"}</p>
        </div>
      </Link>
      {isCustom && (
        <div className="flex flex-col sm:flex-row sm:justify-between mt-3 text-sm gap-2">
          <button
            onClick={() => navigate(`/edit/${character.id}`)}
            className="bg-amber-300 font-semibold px-4 py-2 rounded-md border  
             hover:bg-amber-400  transition-colors duration-200 "
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-300 font-semibold px-4 py-2 rounded-md border 
             hover:bg-red-400  transition-colors duration-200 "
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
