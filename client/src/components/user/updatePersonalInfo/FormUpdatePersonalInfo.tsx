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

export type UpdatePersonalInfo = {
    mail: string,
    cellphone: string
};

type UpdatePersonalInfoErrors = {
    mail?: string,
    cellphone?: string | number
};

const INITIAL_VALUES = {
    mail: '',
    cellphone: ''
}

const REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        setIsClicked(true);
        const userID = userInfo.hbAccount.id;
        const token = userInfo.jwt;
        
        const request = await updatePersonalData(userID, values, token);
        
        if (request?.status === 401 || request?.status === 400) {
            // setErrorMessage(request.error);
            setIsClicked(false);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

        if (request?.status === 200) {
            setIsClicked(false);
            alert('Datos actualizados correctamente, inicie sesion nuevamente') //! ALERT TEMPORAL
            sessionStorage.clear();
            window.location.reload();
        }
    };

    const validateFields = (values: UpdatePersonalInfo) => {
        const { mail, cellphone } = values;
        const errors: UpdatePersonalInfoErrors = {};

        if (mail === userInfo.hbAccount.user.mail) errors.mail = "El email debe ser distinto al actual.";
        if (!REGEXP.test(mail)) errors.mail = "Debe insertar un mail válido."
        if (cellphone.length < 10 || cellphone.length > 12) errors.cellphone = "Número no válido."
        if (isNaN(parseInt(cellphone))) errors.cellphone = "El número no puede contener letras."
        if (cellphone.length === 0) errors.cellphone = "Campo requerido."

        return errors;
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