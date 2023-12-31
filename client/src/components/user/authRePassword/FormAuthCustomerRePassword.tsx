"use client";
import { Formik, Field, Form } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import {
  AuthCustomerRePass,
  ErrorsAuthCustomerRePass,
} from "../interfaces/usersRePassword.interface";
import { authCustomerRePass } from "@/utils/authRepasswordRequest";
import Link from "next/link";
import * as Yup from "yup";

const INITIAL_VALUES = {
  username: "",
  reference_code: "",
};

const FormAuthCustomerRePassword = (): React.ReactElement => {
  const router = useRouter();
  const { isClicked, errorMessage, setIsClicked, setErrorMessage } =
    useGlobalContext();

  const handleSubmit = async (values: AuthCustomerRePass) => {
    const { username, reference_code } = values;

    const request: AuthCustomerRePass = {
      username,
      reference_code,
    };

    const data = await authCustomerRePass(request);

    if (data?.status === 404 || data?.status === 400) {
      setIsClicked(false);
      setErrorMessage(data.error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    setIsClicked(false);
    router.push(`/customer/auth-customer/${data.id}`);
  };

  const validateFields = (
    values: AuthCustomerRePass
  ): ErrorsAuthCustomerRePass => {
    const { username, reference_code } = values;
    const errors: ErrorsAuthCustomerRePass = {};

    if (username.length < 6 || username.length > 25)
      errors.username =
        "El nombre de usuario debe contener entre 6 y 25 caracteres.";
    if (reference_code.length < 10 || reference_code.length > 10)
      errors.reference_code = "Debe insertar un codigo de referencia válido.";
    return errors;
  };

  return (
    <div className="flex flex-col tablet:items-center">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          handleSubmit(values);
          setIsClicked(true);
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
            <SubmitButton value={isClicked ? "Solicitando..." : "Solicitar"} />
            <Link
              className="pb-1 text-center tablet:pb-2 text-blue-700 whitespace-nowrap"
              href={"/customer/login"}
            >
              Volver
            </Link>
          </div>
        </Form>
      </Formik>
      {errorMessage && <MessageAuthorization message={errorMessage} />}
    </div>
  );
};

export default FormAuthCustomerRePassword;
