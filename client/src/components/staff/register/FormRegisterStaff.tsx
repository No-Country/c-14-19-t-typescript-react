"use client";
import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  BackendTypesStaff,
  StaffRegister,
  StaffRegisterErrors,
} from "../interfaces/staff.interface";
import LabelsForm from "@/components/labels/LabelsForm";
import SpanError from "@/components/errors/SpanError";
import SubmitButton from "@/components/buttons/SubmitButton";
import { registerStaff } from "@/utils/formsRequests";
import { getParsedDate } from "@/utils/utils";
import { getSession } from "@/utils/getJwtSession";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";
import calculateUserAge from "@/utils/calculateUserAge";
import { useGlobalContext } from "@/hooks/useContext";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  birthday: "",
  dni: "",
  mail: "",
  cellphone: "",
  username: "",
  password: "",
  department: "",
};
const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormRegisterStaff = (): React.ReactElement => {
  const {
    errorMessage,
    isClicked,
    isAuthorized,
    setErrorMessage,
    setIsClicked,
    setIsAuthorized,
  } = useGlobalContext();

  const handleSubmit = async (
    values: StaffRegister,
    { resetForm }: FormikHelpers<StaffRegister>
  ) => {
    const {
      username,
      password,
      name,
      mail,
      lastname,
      dni,
      department,
      birthday,
      cellphone,
    } = values;

    const newStaffUser: BackendTypesStaff = {
      name,
      lastname,
      dni: parseInt(dni),
      birthday: getParsedDate(birthday),
      mail,
      cellphone: parseInt(cellphone),
      username,
      password,
      department: department.toLowerCase(),
    };

    // Verificar token y mandar la peticion
    const token = await getSession(sessionStorage.getItem("jwtSession"));
    const newStaff = await registerStaff(newStaffUser, token.jwt);

    if (newStaff?.status === 404) {
      setIsAuthorized(false);
      setErrorMessage(newStaff.data.msg);
      setIsClicked(false);
    }
    if (newStaff?.status === 400) {
      setIsAuthorized(false);
      setErrorMessage(newStaff.data.msg);
      setIsClicked(false);
    }
    if (newStaff?.status === 201) {
      setIsAuthorized(true);
      setIsClicked(false);
      resetForm();
      alert("Usuario registrado correctamente!"); //! ALERT TEMPORAL
    }
  };

  const validateFields = (values: StaffRegister) => {
    const {
      username,
      password,
      name,
      mail,
      lastname,
      dni,
      cellphone,
      birthday,
      department,
    } = values;
    const errors: StaffRegisterErrors = {};

    const isUserOlder = calculateUserAge(birthday);

    if (name.length < 3 || name.length > 25)
      errors.name = "Nombre incorrecto (3 - 25 caracteres)";
    if (lastname.length < 3 || lastname.length > 25)
      errors.lastname = "Apellido incorrecto (3 - 25 caracteres)";
    if (!birthday) errors.birthday = "Debe insertar su fecha de nacimiento";
    if (isUserOlder === false) errors.birthday = "Debe ser mayor a 18 años";
    if (dni.length < 7 || dni.length > 8) errors.dni = "Dni incorrecto";
    if (!REGEXP.test(mail)) errors.mail = "Email incorrecto";
    if (cellphone.length < 10 || cellphone.length > 12)
      errors.cellphone = "Número inexistente";
    if (username.length < 6 || username.length > 25)
      errors.username = "Usuario incorrecto (3 - 25 caracteres)";
    if (password.length < 6 || password.length > 25)
      errors.password = "Contraseña incorrecta (3 - 25 caracteres)";
    if (!department) errors.department = "Debes seleccionar un departamento";

    return errors;
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
          handleSubmit(values, resetForm);
          setIsClicked(true);
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col justify-center p-5 h-full tablet:justify-start ">
          <div className="h-full flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
          <h1 className="mt-5 text-xl font-semibold whitespace-nowrap text-center desktop:text-4xl overflow-y-hidden tablet:mb-10 pb-5">
            Registrar nuevo
            <span className="eb-principalColor"> Staff Member</span>
          </h1>
            <div className="flex flex-col gap-[5px] tablet:gap-0">
              <LabelsForm htmlFor="nombre" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="name"
                type="text"
              />
              <SpanError prop="name" />

              <LabelsForm htmlFor="apellido" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="lastname"
                type="text"
              />
              <SpanError prop="lastname" />

              <LabelsForm htmlFor="contraseña" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="password"
                type="password"
              />
              <SpanError prop="password" />

              <LabelsForm htmlFor="fecha de nacimiento" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="birthday"
                type="date"
              />
              <SpanError prop="birthday" />

              <LabelsForm htmlFor="DNI" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="dni"
                type="text"
              />
              <SpanError prop="dni" />
            </div>

            <div className="flex flex-col gap-[5px] tablet:gap-0">
              <LabelsForm htmlFor="email" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="mail"
                type="email"
              />
              <SpanError prop="mail" />

              <LabelsForm htmlFor="celular" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />

              <LabelsForm htmlFor="nombre de usuario" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="username"
                type="text"
              />
              <SpanError prop="username" />

              <LabelsForm htmlFor="departamento - (attention / hhrr)" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="department"
                type="text"
              />
              <SpanError prop="department" />

              <div className="flex justify-center desktop:relative desktop:top-7">
                <SubmitButton
                  value={isClicked ? "Registrando..." : "Registrar"}
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      {isAuthorized ? "" : <MessageAuthorization message={errorMessage} />}
    </>
  );
};

export default FormRegisterStaff;
