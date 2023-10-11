"use client";
import { nunito } from "@/fonts/fonts";
import React from "react";
import { UserRegisterTypes, UserTypesBackend, ValidationErrors } from "@/interfaces/users.interface";
import { Formik, Form, Field } from "formik";
import SpanError from "@/components/errors/SpanError";
import calculateUserAge from "@/utils/calculateUserAge";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  email: "",
  birthday: "",
  cellphone: '',
  dni: '',
}
const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormRegister = (): React.ReactElement => {
  const handleSubmit = (values: UserRegisterTypes) => {
    const { name, lastname, email, birthday, cellphone, dni } = values;
    
    const finalResponse: UserTypesBackend = {
      name,
      lastname,
      email,
      birthday,
      cellphone: parseInt(cellphone),
      dni: parseInt(dni)
    };

    console.log(finalResponse)
  };

  const validateFields = (values: UserRegisterTypes) => {
    const { name, lastname, email, birthday, cellphone, dni } = values;
    const errors: ValidationErrors = {};
    
    const isUserOlder = calculateUserAge(birthday);

    if (name.length < 3) errors.name = "The name has to be longer than 3 characters";
    if (lastname.length < 3) errors.lastname = "The lastname has to be longer than 3 characters";
    if (!REGEXP.test(email)) errors.email = "Invalid email";
    if (!birthday) errors.birthday = "Your birthday is required for our security";
    if (isUserOlder === false) errors.birthday = "You should be 18 years old";
    if (cellphone.length < 10) errors.cellphone = "Non-existent phone";
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
          <label htmlFor="name" className={`mt-5 font-bold ${nunito.className}`}>
            Name
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="name"
            type="text"
          />
          <SpanError prop="name"/>

          <label htmlFor="lastname" className={`mt-5 font-bold ${nunito.className}`}>
            Lastname
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="lastname"
            type="text"
          />
          <SpanError prop="lastname"/>

          <label htmlFor="email" className={`mt-5 font-bold ${nunito.className}`}>
            Email
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="email"
            type="email"
          />
          <SpanError prop="email"/>

          <label htmlFor="birthday" className={`mt-5 font-bold ${nunito.className}`}
          >
            Birthday
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="birthday"
            type="date"
          />
          <SpanError prop="birthday"/>

          <label htmlFor="cellphone" className={`mt-5 font-bold ${nunito.className}`}>
            Cellphone
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="cellphone"
            type="text"
          />
          <SpanError prop="cellphone"/>

          <label htmlFor="dni" className={`mt-5 font-bold ${nunito.className}`}>
            DNI
          </label>
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200"
            name="dni"
            type="text"
          />
          <SpanError prop="dni"/>

          <div className="w-full flex justify-center">
            <button type="submit" className="mt-5 p-1 bg-indigo-500 rounded w-[50%]">
              Send
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormRegister;  