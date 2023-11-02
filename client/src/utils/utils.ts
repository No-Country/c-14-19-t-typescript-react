import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const getParsedDate = (date: string): string => {
  if (date === "") {
    return date;
  }
  const [day, month, year] = date.split("/")[0].split("-").reverse();
  const finalDate = `${day}/${month}/${year.slice(-2)}`;
  return finalDate;
};

export const getDepartmentLetter = (department: string): string =>
  department.slice(0, department.length - (department.length - 1));

export const successAlert = (message: string) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    theme: "colored",
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    autoClose: 3000
});

export const errorAlert = (message: string) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    theme: 'colored',
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    autoClose: 3000,
})