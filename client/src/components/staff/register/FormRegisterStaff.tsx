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
import * as Yup from "yup";

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

const departments = ["hhrr", "attention"];

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

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El nombre de usuario debe ser mayor a 6 caracteres.")
      .max(25, "El nombre de usuario debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
    password: Yup.string()
      .min(6, "La contraseña debe ser mayor a 6 caracteres.")
      .max(25, "La contraseña debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
    name: Yup.string()
      .min(3, "El nombre debe ser mayor a 3 caracteres.")
      .max(25, "El nombre debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
    mail: Yup.string().email("Email no válido").required("Campo requerido."),
    lastname: Yup.string()
      .min(3, "El apellido debe ser mayor a 3 caracteres.")
      .max(25, "El apellido debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
    dni: Yup.string()
      .min(7, "DNI no válido.")
      .max(8, "DNI no válido.")
      .required("Campo requerido.")
      .test(
        "chars-not-allowed",
        "Este campo permite solo números.",
        (value) => {
          if (/^[0-9]+$/.test(value)) return true;
          return false;
        }
      ),
    cellphone: Yup.string()
      .min(10, "Número no válido.")
      .max(12, "Número no valido.")
      .required("Campo requerido.")
      .test(
        "chars-not-allowed",
        "Este campo permite solo números.",
        (value) => {
          if (/^[0-9]+$/.test(value)) return true;
          return false;
        }
      ),
    birthday: Yup.string()
      .required("Campo requerido.")
      .test("is-user-adult", "Tenes que ser mayor de 18 años.", (value) => {
        const isUserOlder = calculateUserAge(value);
        return isUserOlder;
      }),
    department: Yup.string()
      .equals(["hhrr", "attention"], "Departamento no encontrado.")
      .required("Campo requerido."),
  });

  const validateFields = async (values: StaffRegister) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: StaffRegisterErrors = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
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
        <Form className="flex flex-col justify-center p-5 tablet:p-0 h-full tablet:justify-start ">
          <h1 className="mt-5 tablet:mt-10 text-xl font-semibold text-center desktop:text-4xl overflow-y-hidden  pb-5">
            Registrar nuevo
            <span className="eb-principalColor"> Staff Member</span>
          </h1>
          <div className="h-full flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col items-center h-full tablet:gap-0">
              <LabelsForm htmlFor="nombre" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="name"
                type="text"
              />
              <SpanError prop="name" />

              <LabelsForm htmlFor="apellido" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="lastname"
                type="text"
              />
              <SpanError prop="lastname" />

              <LabelsForm htmlFor="contraseña" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="password"
                type="password"
              />
              <SpanError prop="password" />

              <LabelsForm htmlFor="fecha de nacimiento" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="birthday"
                type="date"
              />
              <SpanError prop="birthday" />

              <LabelsForm htmlFor="DNI" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="dni"
                type="text"
              />
              <SpanError prop="dni" />
            </div>

            <div className="flex flex-col items-center h-full tablet:gap-0">
              <LabelsForm htmlFor="email" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="mail"
                type="email"
              />
              <SpanError prop="mail" />

              <LabelsForm htmlFor="celular" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />

              <LabelsForm htmlFor="nombre de usuario" />
              <Field
                className="placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="username"
                type="text"
              />
              <SpanError prop="username" />

              <LabelsForm htmlFor="departamento - (attention / hhrr)" />
              <Field
                className="mb-4 placeholder:text-center outline-none bg-[#cfd7cd] p-2 rounded text-sm w-[220px] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="department"
                as="select"
              >
                <option>Seleccione departamento</option>
                {departments.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Field>
              <SpanError prop="department" />

              <div className="flex justify-center desktop:relative desktop:top-[1.3%] w-full">
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
