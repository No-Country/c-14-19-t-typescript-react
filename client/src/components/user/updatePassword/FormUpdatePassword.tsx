"use client";
import MessageAuthorization from '@/components/authorization/MessageAuthorization';
import SubmitButton from '@/components/buttons/SubmitButton';
import SpanError from '@/components/errors/SpanError';
import LabelsForm from '@/components/labels/LabelsForm';
import { useGlobalContext } from '@/hooks/useContext';
import { updatePassword } from '@/utils/formsRequests';
import { getCustomerSession } from '@/utils/getJwtSession';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type updatePassword = {
  password: string,
  repeatPassword: string
}

type updatePasswordErrors = {
  password?: string
  repeatPassword?: string
}

const INITIAL_VALUES = {
  password: '',
  repeatPassword: ''
}

const FormUpdatePassword = (): React.ReactElement => {
  const router = useRouter();
  const { errorMessage, isClicked, setIsClicked, setErrorMessage } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({ jwt: '', hbAccount: { id: '' } });

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

  const handleSubmit = async (values: updatePassword) => {
    const { password } = values;

    setIsClicked(true)

    const request = await updatePassword(userInfo.hbAccount.id, password, userInfo.jwt)
    
    if (request?.status === 401) {
      setErrorMessage(request.error);
      setIsClicked(false);
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
    if (request?.status === 400) {
      setErrorMessage(request.error);
      setIsClicked(false);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    if (request?.status === 200) {
      alert(request.data.msg); //! ALERT TEMPORAL
      setIsClicked(false);
      router.push('/customer/homebanking')
    }
  };

  const validateFields = (values: updatePassword) => {
    const { password, repeatPassword } = values;
    const errors: updatePasswordErrors = {};

    if (password === undefined) errors.password = "No puede dejar el campo vacío.";
    if (password.length < 6 || password.length > 25) errors.password = "La contraseña debe contener entre 6 a 25 caracteres."
    if (repeatPassword !== password) errors.repeatPassword = "La contraseña no coincide con la con la escrita."

    return errors;
  };

  return (
    <div className='w-[80%]'>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit} validate={validateFields}>
        <Form className='flex flex-col'>
          <LabelsForm htmlFor='Contraseña'/>
          <Field
              className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
              name="password"
              type="password"
              />
          <SpanError prop="password" />

          <div className='mt-5'>
            <LabelsForm htmlFor='Repetir contraseña'/>
          </div>
          <Field
              className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
              name="repeatPassword"
              type="password"
              />
          <SpanError prop="repeatPassword" />

          <div className='flex justify-center mt-5'>
            <SubmitButton value={isClicked ? 'Actualizando...' : 'Actualizar'}/>
          </div>
        </Form>
      </Formik>
      { errorMessage && <MessageAuthorization message={errorMessage}/> }
    </div>
  )
}

export default FormUpdatePassword;