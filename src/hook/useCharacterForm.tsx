import { useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";

const useCharacterForm = (
  mutationFn: (data: any) => Promise<any>,
  successMessage: string,
  redirectPath: string,
  isLoading?: boolean
) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await mutationFn(data);
      showToast(successMessage, "success");
      navigate(redirectPath);
    } catch {
      showToast("Ocurrió un error", "error");
    }
  };

  return { handleSubmit, isLoading  };
};
export default useCharacterForm;

