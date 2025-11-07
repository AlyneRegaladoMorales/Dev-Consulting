import { useGetCustomCharactersQuery } from "../api/customCharacter";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

const ListCustomItem = () => {
  const { data, isLoading, isError } = useGetCustomCharactersQuery();

  console.log("Loading state:", isLoading);
  console.log("Error state:", isError);
  console.log("Data:", data);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {isLoading && <Loading size="10"/>}
          {isError && <p>Error al cargar personajes.</p>}
          {data && data.map((char) => <Card key={char.id} character={char} isCustom/>)}
        </div>
      </section>
    </>
  );
};

export default ListCustomItem;
