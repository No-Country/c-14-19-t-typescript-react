"use client";
import React from "react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import { LoginErrors, LoginFields } from "../interfaces/usersLogin.interface";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";
import { loginCustomer } from "@/utils/formsRequests";
import { useGlobalContext } from "@/hooks/useContext";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { errorAlert } from "@/utils/utils";

const INITIAL_VALUES = {
  username: "",
  password: "",
};

const FormLogin = (): React.ReactElement => {
  const router = useRouter();
  const { isClicked, errorMessage, setIsClicked, setErrorMessage } =
    useGlobalContext();

  const handleSubmit = async (values: LoginFields) => {
    const { username, password } = values;

    const request: LoginFields = {
      username,
      password,
    };

    const login = await loginCustomer(request);

    if (login?.status === 404 || login?.status === 400) {
      setIsClicked(false);
      errorAlert(login.error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3500);
    } else {
      setIsClicked(false);
      router.push("/customer/homebanking");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El nombre de usuario debe ser mayor a 6 caracteres,")
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
    password: Yup.string()
      .min(6, "La contraseña debe ser mayor a 6 caracteres.")
      .max(25, "La contraseña debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
  });

  const validateFields = async (values: LoginFields) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: LoginErrors = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });

      return errors;
    }
  };

  return (
    <div className="flex flex-col tablet:items-center">
      <ToastContainer />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          handleSubmit(values);
          setIsClicked(true);
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 mobile:w-[100%] tablet:w-[40%] desktop:w-[45%]">
          <LabelsForm htmlFor="usuario" />
          <Field
            className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:p-3 desktop:w-full desktop:p-4 tablet:text-lg"
            name="username"
            type="text"
          />
          <SpanError prop="username" />

          <LabelsForm htmlFor="contraseña" />
          <Field
            className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:p-3 desktop:w-full desktop:p-4"
            name="password"
            type="password"
          />
          <SpanError prop="password" />

          <div className="flex flex-col items-center mt-10 tablet:flex-row tablet:items-end justify-center gap-[30px] tablet:gap-[50px] w-full">
            <SubmitButton value={isClicked ? "Ingresando..." : "Login"} />
            <Link
              className="pb-1 text-center text-sm desktop:text-lg tablet:pb-2 text-blue-700 whitespace-nowrap"
              href={"/customer/auth-customer"}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormLogin;
