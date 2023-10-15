"use client";
import SubmitButton from "@/components/buttons/SubmitButton";
import LabelsForm from "@/components/labels/LabelsForm";
import { Formik, Form, Field } from "formik";
import React from "react";
import { StaffLogin, StaffLoginErrors } from "../interfaces/staff.interface";
import { useRouter } from "next/navigation";
import SpanError from "@/components/errors/SpanError";

const INITIAL_VALUES = {
  username: "",
  password: "",
};

const FormLoginStaff = (): React.ReactElement => {
  const router = useRouter();
  const handleSubmit = (values: StaffLogin) => {
    const { username, password } = values;

    const request: StaffLogin = {
      username,
      password
    }

    console.log(request);

    // ? SetTimeout para simular una peticion asincrona hasta que este el backend
    setTimeout(() => {
      router.push('/home-staff')
    }, 1000);
  };

  const validateFieds = (values: StaffLogin): StaffLoginErrors => {
    const { username, password } = values;
    const errors: StaffLoginErrors = {};

    if (username.length < 6 || username.length > 25) errors.username = "Username must be between 6 - 25 characters";
    if (password.length < 6 || password.length > 25) errors.password = "Password must be between 6 - 25 characters";

    return errors;
  };
  return (
    <div className="w-[80%] mt-5 tablet:w-[70%] desktop:w-[50%]">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFieds}
      >
        <Form className="flex flex-col">
          <LabelsForm htmlFor="username" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="username"
            type="text"
          />
          <SpanError prop="username"/>

          <LabelsForm htmlFor="password" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm mobile:w-[100%] focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[100%] tablet:p-3 desktop:p-4 tablet:text-lg desktop:text-xl"
            name="password"
            type="password"
          />
          <SpanError prop="password"/>

          <div className="flex justify-center">
          <SubmitButton value="Login"/>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormLoginStaff;
