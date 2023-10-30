"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import LabelsForm from "@/components/labels/LabelsForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useGlobalContext } from "@/hooks/useContext";
import MessageAuthorization from "@/components/authorization/MessageAuthorization";

type dniError = Record<string, string>;

type dniField = {
  dni: string;
};
const INITIAL_VALUES = {
  dni: "",
};

const Page = (): React.ReactElement => {
  const router = useRouter();
  const { exists } = useGlobalContext();

  const handleSubmit = (values: dniField) => {
    const { dni } = values;
    router.push(`/staff/searchcustomer/${dni}`);
  };

  const validationSchema = Yup.object().shape({
    dni: Yup.string()
      .min(7, "El DNI no existe.")
      .max(8, "El DNI no existe.")
      .required("Campo requerido.")
      .test("invalid-document", "DNI incorrecto.", (value) => {
        const pattern = /^\d+$/;
        if (pattern.test(value)) return true;
        else return false;
      }),
  });

  const validateFields = async (values: dniField) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: dniError = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5 bg-slate-100">
      <h2 className=" text-2xl font-bold tablet:text-4xl desktop:text-4xl overflow-y-hidden">
        Introduce en DNI del cliente
      </h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={validateFields}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col">
          <LabelsForm htmlFor="dni" />
          <Field
            className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
            name="dni"
            type="text"
          />
          <SpanError prop="dni" />
          <div className="flex justify-center">
            <SubmitButton value="Buscar" />
          </div>
        </Form>
      </Formik>
      {exists === false ? (
        <MessageAuthorization message="Usuario no encontrado" />
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
