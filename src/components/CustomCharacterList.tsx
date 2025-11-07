import { useDeleteCustomCharacterMutation, useGetCustomCharactersQuery } from '../api/customCharacter';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CustomCharacterList = () => {
 const { data, isLoading } = useGetCustomCharactersQuery();
  const [deleteCustomCharacter] = useDeleteCustomCharacterMutation();

  if (isLoading) return <Loading size="10"/>;

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {data?.map((c) => (
        <div key={c.id} className="border rounded-lg p-4 shadow bg-white">
          <img src={c.image} alt={c.name} className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{c.name}</h2>
          <p className="text-gray-600">{c.race}</p>
          <p className="text-sm mt-2">{c.description}</p>
          <div className="flex justify-between mt-4">
            <Link to={`/edit/${c.id}`} className="text-blue-600">Editar</Link>
            <button onClick={() => deleteCustomCharacter(c.id!)} className="text-red-600">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomCharacterList
