import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: 'Page 404 not found',
}

const Error404 = (): React.ReactElement => {
  return (
    <div className='bg-black h-screen flex flex-col justify-center items-center'>
      <div>
        <h2 className='text-red-500 text-2xl font-bold tablet:text-3xl desktop:text-4xl overflow-y-hidden'>Error 404 page not found</h2>
        
        <div className='flex justify-center mt-5'>
          <Link href='/' className='text-slate-400 tablet:text-lg'>Go back home</Link>
        </div>
      </div>
    </div>
  )
}

export default Error404