import { Bounce, toast, ToastPosition, ToastTransition } from "react-toastify";

interface ReactToastProps {
  position?: ToastPosition;
  autoClose?: number;
  limit?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  theme?: string;
  transition?: ToastTransition;
  toastType: "success" | "error" | "info" | "warning";
  toastMessage: string;
}

const useLocalToast = () => {
  const callToast = ({
    position = "top-center",
    autoClose = 2300,
    hideProgressBar = false,
    closeOnClick = true,
    rtl = false,
    pauseOnFocusLoss = true,
    draggable = true,
    pauseOnHover = false,
    theme = "colored",
    transition = Bounce,
    toastType = "success",
    toastMessage = "",
  }: ReactToastProps) => {
    toast(toastMessage, {
      type: toastType,
      position: position,
      autoClose: autoClose,
      hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick,
      rtl: rtl,
      pauseOnFocusLoss: pauseOnFocusLoss,
      draggable: draggable,
      pauseOnHover: pauseOnHover,
      theme: theme,
      transition: transition,
    });
  };

  return { callToast };
};
export default useLocalToast;
