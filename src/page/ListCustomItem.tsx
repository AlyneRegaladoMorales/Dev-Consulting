import { useGetCustomCharactersQuery } from "../api/customCharacter";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const ListCustomItem = () => {
  const { data, isLoading, isError } = useGetCustomCharactersQuery();
   
  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-8 mt-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {isLoading && <p>Cargando...</p>}
          {isError && <p>Error al cargar personajes.</p>}
          {!data?.length && <p>No hay personajes creados.</p>}
          {data && data.map((char) => <Card key={char.id} character={char} isCustom/>)}
        </div>
      </section>
    </>
  );
};

export default ListCustomItem;
