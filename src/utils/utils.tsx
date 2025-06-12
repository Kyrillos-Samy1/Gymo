import { toast } from "react-toastify";

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

export function toastError(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "flex justify-start items-center"
  });
}

export function toastSuccess(message: string) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "flex justify-start items-center"
  });
}

export function toastWarning(message: string) {
  toast.warning(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "flex justify-start items-center"
  });
}
