import React from 'react'
import FormAuthCustomerRePassword from '@/components/user/authRePassword/FormAuthCustomerRePassword'

const page = (): React.ReactElement =>{
  return (
    <div className='h-screen flex flex-col justify-center'>
        <h2 className='text-2xl text-center'>Cambio de contraseña</h2>
        <FormAuthCustomerRePassword></FormAuthCustomerRePassword>
    </div>
  )
}

export default page