import { useParams } from "react-router-dom";
import { useGetCustomCharacterByIdQuery, useUpdateCustomCharacterMutation } from "../api/customCharacter";
import CharacterForm from "../components/CharacterForm";
import useCharacterForm from "../hook/useCharacterForm";
import Loading from "../components/Loading";

const EditCharacter = () => {
  const { id } = useParams();
  const { data } = useGetCustomCharacterByIdQuery(Number(id));
  const [updateCustomCharacter, { isLoading }] = useUpdateCustomCharacterMutation();


  const { handleSubmit } = useCharacterForm(
    (values) => updateCustomCharacter({ id: Number(id), data: values }).unwrap(),
    "¡Personaje actualizado con éxito!",
    "/custom",
    isLoading
  );

  if (isLoading || !data) return <Loading size="10"/>;


  return (
    <CharacterForm
      onSubmit={handleSubmit}
      defaultValues={data}
      title="Editar personaje"
      buttonText="Actualizar"
      isSubmitting={isLoading}
    />
  );
};

export default EditCharacter;
