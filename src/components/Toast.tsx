import { type FC } from 'react'

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

const Toast: FC<ToastProps> = ({ message, type = "success" }) => {
  
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md  transition-all border mt-20
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
}

export default Toast




