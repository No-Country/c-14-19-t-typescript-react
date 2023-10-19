"use client"
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { UserRegisterTypes, UserTypesBackend, ValidationErrors } from "@/components/user/interfaces/users.interface";
import calculateUserAge from "@/utils/calculateUserAge";
import getParsedDate from "@/utils/parsedDate";
import { Formik, Form, Field, FormikHelpers } from "formik";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  mail: "",
  birthday: "",
  cellphone: "",
  dni: "",
};

const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Page = ({ params }: any): React.ReactElement => {

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

    console.log(newCustomer);
    
  };

  const validateFields = (values: UserRegisterTypes) => {
    const { name, lastname, mail, birthday, cellphone, dni } = values;
    const errors: ValidationErrors = {};

    const isUserOlder = calculateUserAge(birthday);

    if (1 <= name.length && name.length <= 3) errors.name = "The name must be longer than 3 characters";
    if (1 <= lastname.length && lastname.length  <= 3) errors.lastname = "The lastname must be longer than 3 characters";
    if (1 <= mail.length && !REGEXP.test(mail)) errors.mail = "Invalid email";
    if (isUserOlder === false && birthday) errors.birthday = "You should be 18 years old";
    if (1 <= cellphone.length && cellphone.length < 10 || cellphone.length > 12) errors.cellphone = "Non-existent phone";
    if (1 <= dni.length &&  dni.length < 8) errors.dni = "Invalid DNI";

    return errors;
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-4xl mt-5 "><h2 className="overflow-y-hidden">Actualizar cliente</h2></div>
      
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
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
            <SubmitButton value="Actualizar" />
          </div>
        </Form>
      </Formik>
      
    </div>
  );
};

export default Page;