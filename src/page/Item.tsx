import { useParams, Link } from "react-router-dom";
import { useGetCharacterByIdQuery } from "../api/postsApi";
import Comments from "../components/Comment";

const Item = () => {
  const { id } = useParams(); 
  const { data, isLoading, isError } = useGetCharacterByIdQuery(Number(id));

  if (isLoading) return <p className="text-center py-10">Cargando personaje...</p>;
  if (isError || !data) return <p className="text-center text-red-600">Error al cargar datos.</p>;

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
         Volver al listado
      </Link>

      <div className="text-center">
        <img
          src={data.image}
          alt={data.name}
          className="mx-auto h-60 w-auto rounded-xl object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{data.name}</h1>
        <p className="text-gray-600">{data.race} </p>
      </div>

      <p className="text-justify text-sm leading-relaxed">{data.description}</p>

      <div className="mt-6 text-center text-sm text-gray-700">
        <p>Ki actual: <b>{data.ki}</b></p>
        <p>Ki máximo: <b>{data.maxKi}</b></p>
      </div>
      <Comments characterId={Number(id)} />
    </main>
  );
};

export default Item;
