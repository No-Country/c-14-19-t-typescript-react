"use client";
import React from "react";
import { Formik, Field, Form } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import { LoginErrors, LoginFields } from "../interfaces/usersLogin.interface";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormLogin = (): React.ReactElement => {
    const router = useRouter();

    const handleSubmit = (values: LoginFields) => {
    const { email, password } = values;

    const request: LoginFields = {
        email,
        password
    }

    console.log(request)
    
    // ? SetTimeout para simular una peticion asincrona hasta que este el backend
    setTimeout(() => {
        router.push('/homeclient')
      }, 1000);
  };

  const validateFields = (values: LoginFields): LoginErrors => {
    const { email, password } = values;
    const errors: LoginErrors = {};

    if (!REGEXP.test(email)) errors.email = "Invalid email";
    if (password.length < 3) errors.password = "The password must be longer than 3 characters";

    return errors;
  };

  return (
    <div className="flex flex-col tablet:items-center">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 mobile:w-[100%] tablet:w-[40%] desktop:w-[45%]">
          <LabelsForm htmlFor="email" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="email"
            type="email"
          />
          <SpanError prop="email"/>

          <LabelsForm htmlFor="password" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="password"
            type="password"
          />
          <SpanError prop="password"/>

          <div className="w-full flex justify-center">
            <SubmitButton value="Login" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormLogin;
