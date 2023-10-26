"use client"
import MessageAuthorization from '@/components/authorization/MessageAuthorization';
import SubmitButton from '@/components/buttons/SubmitButton';
import SpanError from '@/components/errors/SpanError';
import LabelsForm from '@/components/labels/LabelsForm';
import { useGlobalContext } from '@/hooks/useContext';
import { authUpdatePassword } from '@/utils/authRepasswordRequest';
import { updatePassword } from '@/utils/formsRequests';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import * as Yup from "yup"

type updatePassword = {
    password: string,
    repeatPassword: string
}

type updatePasswordErrors = Record<string, string>

const INITIAL_VALUES = {
    password: '',
    repeatPassword: ''
}

const FormAuthUpdatePassword = (id : any): React.ReactElement => {
    const router = useRouter();
    const { errorMessage, isClicked, setIsClicked, setErrorMessage } = useGlobalContext();
   
    const handleSubmit = async (values: updatePassword) => {
        const { password } = values;

        const sessionToken = sessionStorage.getItem('AuthUpdatePass')
        if (!sessionToken) router.push('/customer/login');

        setIsClicked(true)

        const request = await authUpdatePassword(id.id, password, sessionToken)

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
            router.push('/customer/login')
        }
    };

    const schemaValidation = Yup.object().shape({
        password: Yup.string().min(6, 'La contraseña debe ser mayor a 6 caracteres.').max(25, 'La contraseña debe ser menor a 25 caracteres.').required('Campo requerido.'),
        repeatPassword: Yup.string().required('Campo requerido.').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.')
    });

    const validateFields = async (values: updatePassword) => {
        try {
            await schemaValidation.validate(values, { abortEarly: false });
        } catch (error: any) {
            const errors: updatePasswordErrors = {};

            error.inner.forEach((e: any) => {
                errors[e.path] = e.message;
            });
            return errors
        }
    };

    return (
        <div className='w-[100%] flex flex-col justify-center items-center'>
            <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit} validate={validateFields}>
                <Form className='flex flex-col'>
                    <LabelsForm htmlFor='Contraseña' />
                    <Field
                        className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                        name="password"
                        type="password"
                    />
                    <SpanError prop="password" />

                    <div className='mt-5'>
                        <LabelsForm htmlFor='Repetir contraseña' />
                    </div>
                    <Field
                        className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                        name="repeatPassword"
                        type="password"
                    />
                    <SpanError prop="repeatPassword" />

                    <div className='flex justify-center mt-5'>
                        <SubmitButton value={isClicked ? 'Actualizando...' : 'Actualizar'} />
                    </div>
                </Form>
            </Formik>
            {errorMessage && <MessageAuthorization message={errorMessage} />}
        </div>
    )
}

export default FormAuthUpdatePassword;