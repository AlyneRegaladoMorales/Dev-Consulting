import { useState, useMemo } from "react";
import { useGetCharactersQuery } from "../api/postsApi";
import type { Character } from "../model/Character";
import { Link } from "react-router-dom";

const ListItem = () => {
    const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetCharactersQuery(page);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return data?.items || [];
    return data?.items.filter((c) => c.name.toLowerCase().includes(q)) || [];
  }, [data, query]);

  if (isLoading) return <p className="text-center py-10">Cargando personajes...</p>;
  if (isError) return <p className="text-center text-red-600">Error al cargar datos.</p>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-6">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 outline-none focus:ring focus:ring-orange-400"
        />
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((char: Character) => (
          <Link
            key={char.id}
            to={`/character/${char.id}`} 
            className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur hover:shadow-md transition"
          >
            <img
              src={char.image}
              alt={char.name}
              className="mx-auto h-40 w-auto rounded-xl object-cover"
              loading="lazy"
            />
            <h3 className="mt-2 text-center text-base font-bold">{char.name}</h3>
            <p className="text-center text-xs text-gray-600">{char.race || "—"}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No se encontraron personajes.
        </p>
      )}
    </main>
  );
};

export default ListItem;
