import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import React from 'react'

export const metadata: Metadata = {
  title: 'EasyBank - Home'
}

const App = (): React.ReactElement => {
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center h-[90vh]'>
        <p className='text-2xl font-medium'>Homebanking in development...</p>
      </div>
    </div>
  )
}

export default App