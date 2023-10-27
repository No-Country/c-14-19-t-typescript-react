"use client"
import MessageAuthorization from '@/components/authorization/MessageAuthorization';
import SubmitButton from '@/components/buttons/SubmitButton';
import SpanError from '@/components/errors/SpanError';
import LabelsForm from '@/components/labels/LabelsForm';
import { useGlobalContext } from '@/hooks/useContext';
import { updatePersonalData } from '@/utils/formsRequests';
import { getCustomerSession } from '@/utils/getJwtSession';
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation';
import React, { useEffect, useId } from 'react'
import * as Yup from "yup";

export type UpdatePersonalInfo = Record<string, string>;

type UpdatePersonalInfoErrors = Record<string, string>

const INITIAL_VALUES = {
    mail: '',
    cellphone: ''
}


const FormUpdatePersonalInfo = (): React.ReactElement => {
    const router = useRouter();
    const { errorMessage, isClicked, userInfo, setUserInfo, setIsClicked, setErrorMessage } = useGlobalContext();

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('customerJwtSession')
        if (!sessionToken) router.push('/');
        const getJwtSession = async () => {
            const session = await getCustomerSession(sessionToken);
            if (session) {
              setUserInfo(session);
            }       
          };
          getJwtSession();
    }, [])

    const handleSubmit = async (values: UpdatePersonalInfo) => {
        const { mail, cellphone } = values;
        setIsClicked(true);
        const userID = userInfo.hbAccount.id;
        const token = userInfo.jwt;

        let body = {}
        
        if (mail) body = { mail };
        if (cellphone) body = { cellphone: parseInt(cellphone) };
        if (!mail && !cellphone) body = { mail: '', cellphone: NaN } 
        
        const request = await updatePersonalData(userID, body, token);
        
        if (request?.status === 401 || request?.status === 400) {
            setErrorMessage('Debe llenar al menos un campo para actualizar sus datos')
            setIsClicked(false);
            setTimeout(() => {
              setErrorMessage('')
            }, 3000);
        }

        if (request?.status === 200) {
            setIsClicked(false);
            alert('Datos actualizados correctamente, inicie sesion nuevamente') //! ALERT TEMPORAL
            sessionStorage.clear();
            window.location.reload();
        }
    };

    const validationSchema = Yup.object().shape({
      mail: Yup.string().email('El email no es válido').test('not-same-as-current', 'El email debe ser distinto al actual.', (value) => {
      const currentUserMail = userInfo.hbAccount.user.mail;

      // Compara el valor del campo 'mail' con el correo electrónico actual del usuario
      if (value === currentUserMail) {
        return false; // Devuelve false si son iguales, lo que generará un error
      }
      
      return true; // Devuelve true si son diferentes, lo que indica una validación exitosa
    })
    .notRequired(),
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
    })

    const validateFields = async (values: UpdatePersonalInfo) => {
        try {
          await validationSchema.validate(values, { abortEarly: false })
        } catch (error: any) {
          // Si encuentra error llena el objeto de errors y lo retorna
          const errors: UpdatePersonalInfoErrors = {};
          error.inner.forEach((e: any) => {
            errors[e.path] = e.message;
          });
          return errors;
        }
    };
  return (
    <div className='w-[80%] flex flex-col justify-center items-center'>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit} validate={validateFields}>
        <Form className='flex flex-col'>
          <LabelsForm htmlFor='Email'/>
          <Field
              className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
              name="mail"
              type="email"
              />
          <SpanError prop="mail" />

          <div className='mt-5'>
            <LabelsForm htmlFor='Telefono'/>
          </div>
          <Field
              className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
              name="cellphone"
              type="text"
              />
          <SpanError prop="cellphone" />

          <div className='flex justify-center mt-5'>
            <SubmitButton value={isClicked ? 'Actualizando...' : 'Actualizar'}/>
          </div>
        </Form>
      </Formik>
      { errorMessage && <MessageAuthorization message={errorMessage}/> }
    </div>
  )
}

export default FormUpdatePersonalInfo