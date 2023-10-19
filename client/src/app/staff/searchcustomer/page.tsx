"use client"
import React from 'react'
import { Formik, Form, Field } from 'formik'
import LabelsForm from '@/components/labels/LabelsForm'
import SubmitButton from '@/components/buttons/SubmitButton'
import SpanError from '@/components/errors/SpanError'
import { useRouter } from 'next/navigation'



type dniError = {
    dni?: string
}
type dniField = {
    dni: string
}
const INITIAL_VALUES = {
    dni: ''
}

const page = (): React.ReactElement => {
    const router = useRouter()
    const handleSubmit = (values: dniField) => {
        
        const { dni } = values

        router.push(`/staff/searchcustomer/${dni}`)
    }

    const validateFields = (values: dniField) => {
        const { dni } = values
        const errors: dniError = {}

        if(dni.length > 8 || dni.length < 7 ) errors.dni = 'El dni no existe'

        return errors
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-5'>
            <h2 className=' text-2xl font-bold tablet:text-4xl desktop:text-4xl overflow-y-hidden'>Introduce en DNI del cliente</h2>
            <Formik
                initialValues={INITIAL_VALUES}
                validate={validateFields}
                onSubmit={handleSubmit}
            >
                <Form className='flex flex-col '>
                    <LabelsForm htmlFor="dni" />
                    <Field
                        className="placeholder:text-center outline-none bg-slate-200 p-2 rounded text-sm focus:bg-slate-300 transition-all ease-in duration-200 tablet:w-[320px] tablet:p-3 desktop:w-[420px] desktop:p-4"
                        name="dni"
                        type="text"
                    />
                    <SpanError prop='dni'/>
                    <div className="flex justify-center">
                        <SubmitButton value="Buscar" />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default page