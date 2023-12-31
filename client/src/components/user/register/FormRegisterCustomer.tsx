"use client";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useRef } from "react";
import {
  CustomerRegister,
  CustomerRegisterErrors,
} from "../interfaces/users.interface";
import { useGlobalContext } from "@/hooks/useContext";
import { registerNewCustomer } from "@/utils/formsRequests";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import * as Yup from "yup";
import { errorAlert, successAlert } from "@/utils/utils";

const INITIAL_VALUES = {
  username: "",
  password: "",
  reference_code: "",
};

const FormRegisterCustomer = () => {
  const router = useRouter();
  const referenceCodeInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);

  const { isClicked, setIsClicked } = useGlobalContext();

  const handleSubmit = async (
    values: CustomerRegister,
    { setFieldValue }: FormikHelpers<CustomerRegister>
  ) => {
    setIsClicked(true);
    const newCustomer = await registerNewCustomer(values);

    if (newCustomer?.status === 404 || newCustomer?.status === 400) {
      errorAlert(newCustomer.error);
      setIsClicked(false);
      if (newCustomer.error === "Usuario ya tiene una cuenta de homebanking") {
        setTimeout(() => {
          setFieldValue("username", "");
          usernameInput.current?.focus(); // Hacer focus al campo de usuario
        }, 3500);
      } else {
        setTimeout(() => {
          setFieldValue("reference_code", "");
          referenceCodeInput.current?.focus(); // Hacer focus al campo de codigo de referencia
        }, 3500);
      }
    }

    if (newCustomer?.status === 201) {
      setIsClicked(false);
      successAlert(
        "Usted va a ser redirigido para loguearse a su nueva cuenta!"
      );
      setTimeout(() => {
        router.push("/customer/login");
      }, 3500);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El nombre de usuario debe contener entre 6 y 25 caracteres.")
      .max(25, "La contraseña debe contener entre 6 y 25 caracteres.")
      .required("Campo requerido.")
      .test(
        "special-chars",
        "No se permiten caracteres especiales",
        (value) => {
          if (!/^[A-Za-z0-9]+$/.test(value)) return false;
          return true;
        }
      ),
    password: Yup.string()
      .min(6, "La contraseña debe contener entre 6 y 25 caracteres.")
      .max(25, "La contraseña debe contener entre 6 y 25 caracteres.")
      .required("Campo requerido."),
    reference_code: Yup.string()
      .min(10, "Debe insertar un codigo de referencia válido.")
      .max(10, "Debe insertar un codigo de referencia válido.")
      .required("Campo requerido."),
  });

  const validateFields = async (values: CustomerRegister) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: CustomerRegisterErrors = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });

      return errors;
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <ToastContainer />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        <Form className="flex flex-col justify-center p-5 h-full">
          <h1 className="text-3xl font-semibold mb-10 tablet:mb-0 desktop:whitespace-nowrap text-center desktop:text-4xl overflow-y-hidden">
            Registra tu cuenta de{" "}
            <span className="text-[#FF5722]">Homebanking</span>
          </h1>
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="usuario" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="username"
                type="text"
                innerRef={usernameInput}
              />
              <SpanError prop="username" />

              <LabelsForm htmlFor="contraseña" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="password"
                type="password"
              />
              <SpanError prop="password" />

              <LabelsForm htmlFor="Código de referencia" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="reference_code"
                type="text"
                innerRef={referenceCodeInput}
              />
              <SpanError prop="reference_code" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center mt-10 overflow-hidden">
            <SubmitButton value={!isClicked ? "Registro" : "Registrando..."} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormRegisterCustomer;
