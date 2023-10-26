"use client"
import SubmitButton from "@/components/buttons/SubmitButton";
import SpanError from "@/components/errors/SpanError";
import LabelsForm from "@/components/labels/LabelsForm";
import { UpdateCustumer, UserRegisterTypes, ValidationErrors } from "@/components/user/interfaces/users.interface";
import { useGlobalContext } from "@/hooks/useContext";
import { clietnUpdate } from "@/utils/dniRequest";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  mail: "",
  birthday: "",
  cellphone: "",
  dni: "",
};

const Page = ({ params }: any): React.ReactElement => {
  const { isClicked, setIsClicked } = useGlobalContext();
  const router = useRouter()

  const handleSubmit = async (values: UserRegisterTypes, { resetForm }: FormikHelpers<UserRegisterTypes>) => {
    const { mail, cellphone } = values;

    let newCustomer: UpdateCustumer = {}

    // Actualizar el body para mandar la peticion
    if (mail) newCustomer = { mail }
    if (cellphone) newCustomer = { cellphone: parseInt(cellphone) };
    if (!mail && !cellphone) newCustomer = { mail: '', cellphone: NaN }

    const res = await clietnUpdate(params.update, newCustomer)
    if (res?.ok) {
      alert('Usuario Actualizado')
      setIsClicked(false)
      resetForm()
      router.push(`/staff/searchcustomer/${params.id}`)
    }

    if(res?.status === 400){      
      alert('No se puedo actualizar el cliente, debe llenar por lo menos un campo')
      setIsClicked(false)
      resetForm()
    }
  };

  const validationSchema = Yup.object().shape({
    mail: Yup.string().email("El email no es válido").notRequired(),
    cellphone: Yup.string()
      .notRequired()
      .test(
        "is-valid-phone",
        "El teléfono debe ser entre 10 y 12 caracteres",
        (value) => {
          if (value) {
            return value.length >= 10 && value.length <= 12;
          }
          return true; // Si el valor está vacío, se considera válido
        }
      ),
  });
  

  const validateFields = async (values: UserRegisterTypes) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      // Si encuentra error llena el objeto de errors y lo retorna
      const errors: ValidationErrors = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
  };


  return (
    <div className="flex flex-col h-[90vh]">
      

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => {
          handleSubmit(values, resetForm);
          setIsClicked(true)
        }}
        validate={validateFields}
      >
        <Form className="flex flex-col justify-center  h-full overflow-y-hidden">
        <div className="flex items-center  justify-center text-4xl mb-8"><h2 className="overflow-y-hidden">Actualizar cliente</h2></div>
          <div className="flex flex-col justify-center items-center">
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