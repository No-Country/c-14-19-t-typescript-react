import FormChangePassword from '@/components/user/repassword/formChangePassword'
import React from 'react'

const page = (): React.ReactElement =>{
  return (
    <div className='h-screen flex flex-col justify-center'>
        <h2 className='text-2xl text-center'>Cambio de contraseña</h2>
        <FormChangePassword></FormChangePassword>
    </div>
  )
}

export default page