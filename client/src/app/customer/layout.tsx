import React, { ReactNode } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className='bg-[#e7e7d9]'>
        {children}
    </div>
  )
}

export default CustomerLayout