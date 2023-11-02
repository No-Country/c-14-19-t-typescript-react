import FormUpdatePersonalInfo from '@/components/user/updatePersonalInfo/FormUpdatePersonalInfo';
import React from 'react'

const UpdateCustomerInfoPage = (): React.ReactElement => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
        <h2 className='font-bold text-2xl overflow-hidden mb-10 desktop:text-4xl'>Actualizar datos personales</h2>
        <FormUpdatePersonalInfo />
    </div>
  )
}

export default UpdateCustomerInfoPage;