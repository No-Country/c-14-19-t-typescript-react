"use client";
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { useGlobalContext } from "@/hooks/useContext";
import { updatePassword } from "@/utils/formsRequests";
import { getCustomerSession } from "@/utils/getJwtSession";
import { errorAlert, successAlert } from "@/utils/utils";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

type updatePassword = {
  password: string;
  repeatPassword: string;
};

type updatePasswordErrors = Record<string, string>;

const INITIAL_VALUES = {
  password: "",
  repeatPassword: "",
};

const FormUpdatePassword = (): React.ReactElement => {
  const router = useRouter();
  const { isClicked, userInfo, setUserInfo, setIsClicked } = useGlobalContext();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("customerJwtSession");
    if (!sessionToken) router.push("/");
    const getJwtSession = async () => {
      const session = await getCustomerSession(sessionToken);
      if (session) {
        setUserInfo(session);
      }
    };
    getJwtSession();
  }, []);

  const handleSubmit = async (
    values: updatePassword,
    { resetForm }: FormikHelpers<updatePassword>
  ) => {
    const { password } = values;

    setIsClicked(true);

    const request = await updatePassword(
      userInfo.hbAccount.id,
      password,
      userInfo.jwt
    );

    if (request?.status === 401 || request?.status === 400) {
      errorAlert(request.error);
      setIsClicked(false);
      resetForm();
    }
    if (request?.status === 200) {
      successAlert(request.data.msg);
      setIsClicked(false);
      resetForm();
      setTimeout(() => {
        router.push("/customer/homebanking");
      }, 3500);
    }
  };

  const schemaValidation = Yup.object().shape({
    password: Yup.string()
      .min(6, "La contraseña debe ser mayor a 6 caracteres.")
      .max(25, "La contraseña debe ser menor a 25 caracteres.")
      .required("Campo requerido."),
    repeatPassword: Yup.string()
      .required("Campo requerido.")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden."),
  });

  const validateFields = async (values: updatePassword) => {
    try {
      await schemaValidation.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: updatePasswordErrors = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
  };

  return (
    <div className="w-[80%] flex flex-col justify-center items-center">
      <ToastContainer />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        <Form className="flex flex-col">
          <LabelsForm htmlFor="Contraseña" />
          <Field
            className="placeholder:text-center bg-[#BCC6B9] outline-none p-2 rounded text-sm focus:bg-[#C5CCB9] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
            name="password"
            type="password"
          />
          <SpanError prop="password" />

          <div className="mt-5">
            <LabelsForm htmlFor="Repetir contraseña" />
          </div>
          <Field
            className="placeholder:text-center bg-[#BCC6B9] outline-none p-2 rounded text-sm focus:bg-[#C5CCB9] transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
            name="repeatPassword"
            type="password"
          />
          <SpanError prop="repeatPassword" />

          <div className="flex justify-center mt-5">
            <SubmitButton
              value={isClicked ? "Actualizando..." : "Actualizar"}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormUpdatePassword;
