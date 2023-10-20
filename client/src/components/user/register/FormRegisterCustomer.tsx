"use client";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { Field, Form, Formik } from "formik";
import React from "react";
import {
  CustomerRegister,
  CustomerRegisterErrors,
} from "../interfaces/users.interface";
import { useGlobalContext } from "@/hooks/useContext";
import { registerNewCustomer } from "@/utils/formsRequests";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  username: "",
  password: "",
  reference_code: "",
};

const FormRegisterCustomer = () => {
  const router = useRouter();
  const { errorMessage, isClicked, isAuthorized, setErrorMessage, setIsClicked, setIsAuthorized } = useGlobalContext();

  const handleSubmit = async (values: CustomerRegister) => {
    const newCustomer = await registerNewCustomer(values);
    
    if (newCustomer?.status === 404) {
        setErrorMessage(newCustomer.error.msg);
        setIsClicked(false);
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    } 
    if (newCustomer?.status === 400) {
        setErrorMessage(newCustomer.error.msg);
        setIsClicked(false)
        setTimeout(() => {
            setErrorMessage('')
        }, 3000);
    }

    if (newCustomer?.status === 201) {
        setIsClicked(false);
        router.push('/customer/homebanking');
    }
    
};

  const validateFields = (values: CustomerRegister) => {
    const { username, password, reference_code } = values;
    const errors: CustomerRegisterErrors = {};

    if (username.length < 6 || username.length > 25) errors.username = "El nombre de usuario debe contener entre 6 y 25 caracteres.";
    if (password.length < 6 || username.length > 25) errors.password = "La contraseña debe contener entre 6 y 25 caracteres.";
    if (reference_code.length < 10 || reference_code.length > 10 ) errors.reference_code = "Debe insertar un codigo de referencia válido.";

    return errors
  };

  return (
    <div className="flex flex-col">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          handleSubmit(values);
          setIsClicked(true);
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 desktop:h-[70vh]">
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="usuario" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="username"
                type="text"
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
              />
              <SpanError prop="reference_code" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center desktop:relative desktop:top-[25px]">
            <SubmitButton value={!isClicked ? "Registro" : "Registrando..."} />
          </div>
        </Form>
      </Formik>
      {errorMessage && <MessageAuthorization message={errorMessage} />}
    </div>
  );
};

export default FormRegisterCustomer;
