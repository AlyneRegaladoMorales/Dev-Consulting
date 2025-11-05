import { useAddCustomCharacterMutation } from "../api/customCharacter";
import { useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";
import CharacterForm from "../components/CharacterForm";

const CreateCharacter = () => {
  const [addCharacter] = useAddCustomCharacterMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await addCharacter(data).unwrap();
      showToast("¡Personaje creado!", "success");
      navigate("/custom");
    } catch {
      showToast("Error al crear personaje", "error");
    }
  };

  return (
    <CharacterForm
      onSubmit={handleSubmit}
      title="Crear personaje"
      buttonText="Guardar"
    />
  );
};

export default CreateCharacter;
