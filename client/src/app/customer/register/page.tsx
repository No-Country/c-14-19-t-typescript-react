import FormRegisterCustomer from '@/components/user/register/FormRegisterCustomer';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'EasyBank - Register'
}

const Register = (): React.ReactElement => {
    return (
        <div className="bg-slate-100">
          <div className="flex flex-col w-full h-[100vh] justify-center items-center">
            
    
            <div className="w-[80%] h-full tablet:w-full flex flex-col p-2">
            
                <FormRegisterCustomer/>
            </div>
          </div>
        </div>
      );
}

export default Register