"use client";
import { Formik, Field, Form } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import { LoginChangePassword, LoginErrors, LoginErrorsChangePassword } from "../interfaces/usersLogin.interface";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";

const INITIAL_VALUES = {
  password: "",
  rePassword: "",
};


const FormChangePassword = (): React.ReactElement => {
    const router = useRouter();
    const { isClicked, errorMessage, setIsClicked, setErrorMessage } = useGlobalContext();

    const handleSubmit = async (values: LoginChangePassword) => {
    const { password, rePassword } = values;

    const request: LoginChangePassword = {
        password,
        rePassword
    }

   /*  const login = await loginCustomer(request);
    
    if (login?.status === 404 || login?.status === 400) {
      setIsClicked(false);
      setErrorMessage(login.error);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    };

    setIsClicked(false);
    router.push('/customer/homebanking') */
    
  };

  const validateFields = (values: LoginChangePassword): LoginErrorsChangePassword => {
    const {  rePassword, password } = values;
    const errors: LoginErrorsChangePassword = {};

    if (password.length < 6 || password.length > 25) errors.password = "La contraseña debe contener entre 6 y 25 caracteres.";
    if (rePassword.length < 6 || rePassword.length > 25) errors.password = "La contraseña debe contener entre 6 y 25 caracteres.";
    return errors;
  };

  return (
    <div className="flex flex-col tablet:items-center">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          handleSubmit(values)
          setIsClicked(true)
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 mobile:w-[100%] tablet:w-[40%] desktop:w-[45%]">
          <LabelsForm htmlFor="usuario" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="password"
            type="password"
          />
          <SpanError prop="password"/>

          <LabelsForm htmlFor="Repetir" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="rePassword"
            type="password"
          />
          <SpanError prop="rePassword"/>

          <div className="w-full flex justify-center">
            <SubmitButton value={isClicked ? 'Ingresando...' : 'Login'} />
          </div>
        </Form>
      </Formik>
      {errorMessage && <MessageAuthorization message={errorMessage}/>}
    </div>
  );
};

export default FormChangePassword;