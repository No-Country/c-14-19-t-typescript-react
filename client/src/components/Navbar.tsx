import React from 'react'
import Link from 'next/link'
import { nunito } from '@/fonts/fonts'


const Navbar = (): React.ReactElement => {
  return (
    <nav className={`flex ${nunito.className} items-center p-3 tablet:h-24 tablet:pr-5 desktop:max-h-32 justify-between border-2 border-orange-500 `}>
      <div className='p-1 tablet:text-2xl text-orange-700 font-extrabold'>
        <p>LOGO</p>
      </div>
      <div className='flex gap-3 font-medium tablet:text-xl'>
        <ul className='p-1 tablet:p-2 rounded-md border-2 border-orange-300'>
          <Link href="/login">LOGIN</Link>
        </ul>
        <ul className='p-1 tablet:p-2 rounded-md border-2 border-orange-300'>
          <Link href="/register">REGISTER</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar