import FormLoginStaff from '@/components/staff/login/FormLoginStaff'
import React from 'react'

const Staff = () => {
  return (
    <div className='w-screen h-[90vh]'>
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <h1 className='mt-5 text-xl font-semibold whitespace-nowrap text-center desktop:text-4xl overflow-y-hidden'>Login for <span className='text-indigo-500'>Staff Members</span> only</h1>
            <FormLoginStaff />
        </div>
    </div>
  )
}

export default Staff