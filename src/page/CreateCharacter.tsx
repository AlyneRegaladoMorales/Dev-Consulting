import { useAddCustomCharacterMutation } from "../api/customCharacter";
import CharacterForm from "../components/CharacterForm";
import useCharacterForm from "../hook/useCharacterForm";

const CreateCharacter = () => {
  const [addCharacter,{ isLoading }] = useAddCustomCharacterMutation();
  
  const { handleSubmit } = useCharacterForm(
  (data) => addCharacter(data).unwrap(),
  "¡Personaje creado!",
  "/custom",
  isLoading
);

  return (
    <CharacterForm
      onSubmit={handleSubmit}
      title="Crear personaje"
      buttonText="Guardar"
      isSubmitting={isLoading}
    />
  );
};

export default CreateCharacter;
