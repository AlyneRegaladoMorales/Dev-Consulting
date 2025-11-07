import { useState, useMemo } from "react";
import { useGetCharactersQuery, useSearchCharactersQuery } from "../api/postsApi";
import type { Character } from "../model/Character";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Loading from "../components/Loading";

const ITEMS_PER_PAGE = 10; 

const ListItem = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const isSearching = query.trim() !== "";

  const { data, isLoading, isError } = isSearching
    ? useSearchCharactersQuery(query)
    : useGetCharactersQuery(page);

  const characters: Character[] = (() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if ("items" in data) return data.items;
    return [];
  })();

  const totalPages = isSearching
    ? Math.ceil(characters.length / ITEMS_PER_PAGE)
    : !Array.isArray(data)
    ? data?.meta.totalPages ?? 1
    : 1;

  const currentPage = isSearching
    ? page
    : !Array.isArray(data)
    ? data?.meta.currentPage ?? 1
    : 1;

  const filtered  = useMemo(() => {
    if (!isSearching) return characters;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return characters.slice(start, end);
  }, [characters, page, isSearching]);

  if (isLoading) return <Loading size="10"/>
  if (isError) return <p className="text-center text-red-600">Error al cargar datos.</p>;

  return (
    <>
  
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <section className="mb-6">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1); 
          }}
          className="w-full rounded-xl border px-4 py-2 outline-none focus:ring focus:ring-orange-400"
        />
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((char) => (
           <Card key={char.id} character={char} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No se encontraron personajes.</p>
      )}

      {totalPages && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </main>
    </>
  );
};

export default ListItem;
