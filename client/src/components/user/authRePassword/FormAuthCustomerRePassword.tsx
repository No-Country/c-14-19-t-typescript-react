"use client";
import { Formik, Field, Form } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import { AuthCustomerRePass, ErrorsAuthCustomerRePass } from "../interfaces/usersRePassword.interface";
import { authCustomerRePass } from "@/utils/authRepasswordRequest";
import Link from "next/link";
import * as Yup from "yup";

const INITIAL_VALUES = {
  username: "",
  reference_code: "",
};


const   FormAuthCustomerRePassword = (): React.ReactElement => {
  const router = useRouter();
  const { isClicked, errorMessage, setIsClicked, setErrorMessage } = useGlobalContext();

  const handleSubmit = async (values: AuthCustomerRePass) => {
    const { username, reference_code } = values;

    const request: AuthCustomerRePass = {
      username,
      reference_code
    }

    const data = await authCustomerRePass(request);    
    
    if (data?.status === 404 || data?.status === 400) {
      setIsClicked(false);
      setErrorMessage(data.error);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    };

    setIsClicked(false);
    router.push(`/customer/auth-customer/${data.id}`) 

  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El nombre de usuario debe ser mayor a 6 caracteres.")
      .max(25, "El nombre de usuario debe ser menor a 25 caracteres.")
      .required("Campo requerido.")
      .test(
        "special-chars",
        "No se permiten caracteres especiales.",
        (value) => {
          if (!/^[A-Za-z0-9]+$/.test(value)) return false;
          return true;
        }
      ),
    reference_code: Yup.string()
      .min(10, "Debe insertar un codigo de referencia válido.")
      .max(10, "Debe insertar un codigo de referencia válido.")
      .required("Campo requerido."),
  });

  const validateFields = async (values: AuthCustomerRePass) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: ErrorsAuthCustomerRePass = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors
    }
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
          <LabelsForm htmlFor="Nombre de Usuario" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="username"
            type="text"
          />
          <SpanError prop="username" />

          <LabelsForm htmlFor="Código de Referencia" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="reference_code"
            type="text"
          />
          <SpanError prop="reference_code" />

          <div className="flex flex-col tablet:flex-row tablet:items-end justify-center gap-[50px] w-full">
            <SubmitButton value={isClicked ? 'Solicitando...' : 'Solicitar'} />
            <Link className="pb-1 text-center tablet:pb-2 text-blue-700 whitespace-nowrap" href={'/customer/login'}>Volver</Link>
          </div>
        </Form>
      </Formik>
      {errorMessage && <MessageAuthorization message={errorMessage} />}
    </div>
  );
};

export default FormAuthCustomerRePassword;