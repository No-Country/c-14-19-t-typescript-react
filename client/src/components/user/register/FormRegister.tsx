"use client";
import React, { useState } from "react";
import { UserRegisterTypes, UserTypesBackend, ValidationErrors } from "@/components/user/interfaces/users.interface";
import { Formik, Form, Field, FormikHelpers } from "formik";
import SpanError from "@/components/errors/SpanError";
import calculateUserAge from "@/utils/calculateUserAge";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import { useRouter } from "next/navigation";
import { createNewCustomer } from "@/utils/formsRequests";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import { getSession } from "@/utils/getJwtSession";
import { getParsedDate } from "@/utils/utils";

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
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (values: UserRegisterTypes, { resetForm }: FormikHelpers<UserRegisterTypes>) => {
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

    if (response.status === 400) {
      setIsAuthorized(false)
      const error = await response.json();
      setErrorMessage(error.msg);
      setIsClicked(false)
      resetForm()
    }

    // En caso de 401, no autorizar y mandar mensaje de error
    if (response.status === 401) {
      setIsAuthorized(false);
      const error = await response.json();
      setErrorMessage(error.msg);
      setIsClicked(false);
      resetForm()
    }

    // En caso de 201, usuario creado y resetear formulario
    if (response.status === 201) {
      setIsClicked(false);
      resetForm();
      setIsAuthorized(true);
      alert('Usuario registrado correctamente!') //! Alert temporal
    }
  };

  const validateFields = (values: UserRegisterTypes) => {
    const { name, lastname, mail, birthday, cellphone, dni } = values;
    const errors: ValidationErrors = {};

    const isUserOlder = calculateUserAge(birthday);

    if (name.length < 3) errors.name = "El nombre debe ser mayor a 3 caracteres";
    if (lastname.length < 3) errors.lastname = "El apellido debe ser mayor a 3 caracteres";
    if (!REGEXP.test(mail)) errors.mail = "Email incorrecto";
    if (!birthday) errors.birthday = "Fecha de nacimiento requerida";
    if (isUserOlder === false) errors.birthday = "Tenes que ser mayor a 18 años";
    if (cellphone.length < 10 || cellphone.length > 12) errors.cellphone = "Número incorrecto";
    if (dni.length < 7 || dni.length > 8) errors.dni = "DNI incorrecto";

    return errors;
  };

  return (
    <div className="flex flex-col h-full">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
          setIsClicked(true)
          handleSubmit(values, resetForm);
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 h-full">
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="name" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="name"
                type="text"
              />
              <SpanError prop="name" />

              <LabelsForm htmlFor="lastname" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="lastname"
                type="text"
              />
              <SpanError prop="lastname" />

              <LabelsForm htmlFor="email" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="mail"
                type="email"
              />
              <SpanError prop="mail" />
            </div>

            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="birthday" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="birthday"
                type="date"
              />
              <SpanError prop="birthday" />

              <LabelsForm htmlFor="cellphone" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />

              <LabelsForm htmlFor="dni" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="dni"
                type="text"
              />
              <SpanError prop="dni" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center desktop:relative desktop:top-[25px]">
            <SubmitButton value={!isClicked ? "Register" : "Checking in..."} />
          </div>
        </Form>
      </Formik>
      {isAuthorized ? "" : <MessageAuthorization message={errorMessage} />}
    </div>
  );
};

export default FormRegister;
