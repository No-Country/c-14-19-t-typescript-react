import React from 'react'
import FormAuthUpdatePassword from '@/components/user/authRePassword/FormAuthUpdatePassword';

const page = ({ params }: any): React.ReactElement =>{
  
  return (
    <div className='h-screen flex flex-col justify-center'>
        <h2 className='font-bold text-2xl text-center'>Cambio de contraseña</h2>
        <FormAuthUpdatePassword id={params.updatePass}/>
    </div>
  )
}

export default page