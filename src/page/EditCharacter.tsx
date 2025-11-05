import { useParams, useNavigate } from "react-router-dom";
import { useGetCustomCharacterByIdQuery, useUpdateCustomCharacterMutation } from "../api/customCharacter";
import useToast from "../hook/useToast";
import CharacterForm from "../components/CharacterForm";

const EditCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data, isLoading} = useGetCustomCharacterByIdQuery(Number(id));
  const [updateCustomCharacter] = useUpdateCustomCharacterMutation();

  if (isLoading || !data) return <p className="text-center mt-20">Cargando...</p>;

 

  const handleSubmit = async (values: any) => {
    try {
      await updateCustomCharacter({ id: Number(id), data: values }).unwrap();
      showToast("¡Personaje actualizado con éxito!", "success");
      
     

      navigate("/custom");
    } catch {
      showToast("Error al actualizar personaje", "error");
    }
  };

  return (
    <CharacterForm
      onSubmit={handleSubmit}
      defaultValues={data}
      title="Editar personaje"
      buttonText="Actualizar"
    />
  );
};

export default EditCharacter;
