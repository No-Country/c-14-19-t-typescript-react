"use client"
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { UpdateCustumer, UserRegisterTypes, ValidationErrors } from "@/components/user/interfaces/users.interface";
import { useGlobalContext } from "@/hooks/useContext";
import { clietnUpdate } from "@/utils/dniRequest";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

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
  const { isClicked, setIsClicked } = useGlobalContext();
  const router = useRouter()

  const handleSubmit = async (values: UserRegisterTypes, { resetForm }: FormikHelpers<UserRegisterTypes>) => {
    const { mail, cellphone } = values;

    const newCustomer: UpdateCustumer = {
      mail,
      cellphone: parseInt(cellphone),
    }

    const res = await clietnUpdate(params.update, newCustomer)
    if (res?.ok) {
      alert('Usuario Actualizado')
      setIsClicked(false)
      resetForm()
      router.push(`/staff/searchcustomer/${params.id}`)
    }

    if(res?.status === 400){
      alert('No se puedo actualizar el cliente')
      setIsClicked(false)
      resetForm()
    }
  };

  const validateFields = (values: UserRegisterTypes) => {
    const { mail, cellphone } = values;
    const errors: ValidationErrors = {};

    if (!REGEXP.test(mail)) errors.mail = "Invalid email";
    if (cellphone.length < 10 || cellphone.length > 12) errors.cellphone = "Non-existent phone";

    return errors;
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-4xl mt-5 "><h2 className="overflow-y-hidden">Actualizar cliente</h2></div>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
          handleSubmit(values, resetForm);
          setIsClicked(true)
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col p-5 h-full">
          <div className="flex flex-col tablet:flex-row tablet:gap-10 tablet:justify-center desktop:gap-20">
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="email" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="mail"
                type="email"
              />
              <SpanError prop="mail" />
            </div>
            <div className="flex flex-col gap-1">
              <LabelsForm htmlFor="cellphone" />
              <Field
                className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                name="cellphone"
                type="text"
              />
              <SpanError prop="cellphone" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center desktop:relative desktop:top-[25px]">
            <SubmitButton value={isClicked ? "Actualizando..." : "Actualizar"} />
          </div>
        </Form>
      </Formik>

    </div>
  );
};

export default Page;