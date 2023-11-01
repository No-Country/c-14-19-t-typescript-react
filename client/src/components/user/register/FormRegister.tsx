"use client";
import React from "react";
import {
  UserRegisterTypes,
  UserTypesBackend,
  ValidationErrors,
} from "@/components/user/interfaces/users.interface";
import { Formik, Form, Field, FormikHelpers } from "formik";
import SpanError from "@/components/errors/SpanError";
import calculateUserAge from "@/utils/calculateUserAge";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import { createNewCustomer } from "@/utils/formsRequests";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import { getSession } from "@/utils/getJwtSession";
import { getParsedDate } from "@/utils/utils";
import { useGlobalContext } from "@/hooks/useContext";
import * as Yup from "yup"

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  mail: "",
  birthday: "",
  cellphone: "",
  dni: "",
};
const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormRegister = (): React.ReactElement => {
  const {
    isAuthorized,
    isClicked,
    errorMessage,
    setIsAuthorized,
    setIsClicked,
    setErrorMessage,
  } = useGlobalContext();

  const handleSubmit = async (
    values: UserRegisterTypes,
    { resetForm }: FormikHelpers<UserRegisterTypes>
  ) => {
    const { name, lastname, mail, birthday, cellphone, dni } = values;

    const newCustomer: UserTypesBackend = {
      name,
      lastname,
      dni: parseInt(dni),
      birthday: getParsedDate(birthday),
      mail,
      cellphone: parseInt(cellphone),
    };

    // Obtener token y mandarlo a la peticion junto con los datos del nuevo cliente
    const token = await getSession(sessionStorage.getItem("jwtSession"));
    const response = await createNewCustomer(newCustomer, token.jwt);

    if (response?.status === 400) {
      setIsAuthorized(false);
      const error = await response.json();
      setErrorMessage(error.msg);
      console.log(error);
      
      setIsClicked(false);
      resetForm();
    }

    // En caso de 401, no autorizar y mandar mensaje de error
    if (response?.status === 401) {
      setIsAuthorized(false);
      const error = await response.json();
      setErrorMessage(error.msg);
      setIsClicked(false);
      resetForm();
    }

    // En caso de 201, usuario creado y resetear formulario
    if (response?.status === 201) {
      setIsClicked(false);
      resetForm();
      setIsAuthorized(true);
      alert("Usuario registrado correctamente!"); //! Alert temporal
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe ser mayor a 3 caracteres.")
      .required("Campo requerido."),
    lastname: Yup.string()
      .min(3, "El apellido debe ser mayor a 3 caracteres.")
      .required("Campo requerido."),
    mail: Yup.string().email("Email no válido.").required("Campo requerido."),
    birthday: Yup.string()
      .required("Campo requerido.")
      .test("is-user-adult", "Tenes que ser mayor de 18 años.", (value) => {
        const isUserOlder = calculateUserAge(value);
        return isUserOlder;
      }),
    cellphone: Yup.string()
      .min(10, "Número incorrecto.")
      .max(12, "Número incorrecto.")
      .required("Campo requerido.")
      .test("is-not-a-number", "Este campo permite solo números.", (value) => {
        if (!/^[0-9]+$/.test(value)) {
          return false;
        }
        return true;
      }),
    dni: Yup.string()
      .min(7, "DNI incorrecto.")
      .max(8, "DNI incorrecto.")
      .required("Campo requerido.")
      .test("is-not-a-number", "Este campo permite solo números.", (value) => {
        if (!/^[0-9]+$/.test(value)) {
          return false;
        }
        return true;
      }),
  });

  const validateFields = async (values: UserRegisterTypes) => {  
    try {
      await validationSchema.validate(values, { abortEarly: false })
    } catch (error: any) {
      const errors: ValidationErrors = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message
      });

      return errors
    }   
  };

  return (
    <div className="flex flex-col h-full">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
          setIsClicked(true);
          handleSubmit(values, resetForm);
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-10 h-full">
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="nombre" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="name"
                type="text"
              />
              <SpanError prop="name" />

              <LabelsForm htmlFor="apellido" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="lastname"
                type="text"
              />
              <SpanError prop="lastname" />

              <LabelsForm htmlFor="email" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="mail"
                type="email"
              />
              <SpanError prop="mail" />
            </div>

            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="fecha de nacimiento" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="birthday"
                type="date"
              />
              <SpanError prop="birthday" />

              <LabelsForm htmlFor="celular" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />

              <LabelsForm htmlFor="DNI" />
              <Field
                className="placeholder:text-center bg-[#f2f2f0] outline-none p-2 rounded text-sm focus:bg-[#E0E0E0] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="dni"
                type="text"
              />
              <SpanError prop="dni" />
            </div>
          </div>

          <div className="w-full mt-5 flex flex-col justify-center items-center">
            <SubmitButton value={!isClicked ? "Registro" : "Registrando..."} />
          </div>
        </Form>
      </Formik>
      {isAuthorized ? "" : <MessageAuthorization message={errorMessage} />}
    </div>
  );
};

export default FormRegister;
