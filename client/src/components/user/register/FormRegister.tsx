"use client";
import React from "react";
import { UserRegisterTypes, UserTypesBackend, ValidationErrors } from "@/components/user/interfaces/users.interface";
import { Formik, Form, Field } from "formik";
import SpanError from "@/components/errors/SpanError";
import calculateUserAge from "@/utils/calculateUserAge";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  birthday: "",
  cellphone: "",
  dni: "",
};
const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormRegister = (): React.ReactElement => {
  const router = useRouter();

  const handleSubmit = (values: UserRegisterTypes) => {
    const { name, lastname, email, password, birthday, cellphone, dni } = values;

    const request: UserTypesBackend = {
      name,
      lastname,
      email,
      password,
      birthday,
      cellphone: parseInt(cellphone),
      dni: parseInt(dni),
    };
    console.log(request);

    // ? SetTimeout para simular una peticion asincrona hasta que este el backend
    setTimeout(() => {
      router.push('/homeclient')
    }, 1000);
  };

  const validateFields = (values: UserRegisterTypes) => {
    const { name, lastname, email, password, birthday, cellphone, dni } = values;
    const errors: ValidationErrors = {};

    const isUserOlder = calculateUserAge(birthday);

    if (name.length < 3) errors.name = "The name must be longer than 3 characters";
    if (lastname.length < 3) errors.lastname = "The lastname must be longer than 3 characters";
    if (!REGEXP.test(email)) errors.email = "Invalid email";
    if (password.length < 3 || password.length > 25) errors.password = "The password must be between 3 - 25 characters";
    if (!birthday) errors.birthday = "Your birthday is required for our security";
    if (isUserOlder === false) errors.birthday = "You should be 18 years old";
    if (cellphone.length < 10 || cellphone.length > 12) errors.cellphone = "Non-existent phone";
    if (dni.length < 8) errors.dni = "Invalid DNI";

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5">
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col">
              <LabelsForm htmlFor="name"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="name"
                type="text"
              />
              <SpanError prop="name" />

              <LabelsForm htmlFor="lastname"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="lastname"
                type="text"
              />
              <SpanError prop="lastname" />

              <LabelsForm htmlFor="email"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="email"
                type="email"
              />
              <SpanError prop="email" />

              <LabelsForm htmlFor="password"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="password"
                type="password"
              />
              <SpanError prop="password"/>
            </div>

            <div className="flex flex-col">
              <LabelsForm htmlFor="birthday"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="birthday"
                type="date"
              />
              <SpanError prop="birthday" />

              <LabelsForm htmlFor="cellphone"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />

              <LabelsForm htmlFor="dni"/>
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="dni"
                type="text"
              />
              <SpanError prop="dni" />
              
              <div className="w-full flex justify-center desktop:relative desktop:top-[25px]">
                <SubmitButton value="Register"/>
              </div>
            
            </div>
          </div>

          
        </Form>
      </Formik>
    </div>
  );
};

export default FormRegister;
