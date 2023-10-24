import FormUpdatePassword from '@/components/user/updatePassword/FormUpdatePassword'
import React from 'react'

const UpdatePasswordPage = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <h2 className='font-bold text-2xl overflow-hidden mb-10 desktop:text-4xl'>Actualizar contraseña</h2>
      <FormUpdatePassword />
    </div>
  )
}

export default UpdatePasswordPage