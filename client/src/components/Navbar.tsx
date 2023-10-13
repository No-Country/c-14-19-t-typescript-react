import React from 'react'
import Link from 'next/link'
import { nunito } from '@/fonts/fonts'


const Navbar = (): React.ReactElement => {
  return (
    <nav className={`flex ${nunito.className} items-center p-3 tablet:h-24 tablet:pr-5 desktop:max-h-32 justify-between border border-b-2 shadow-lg `}>
      <div className='p-1 tablet:text-2xl font-extrabold'>
        <Link href='/'>LOGO</Link>
      </div>
      <div className='flex gap-3 font-medium tablet:text-xl'>
        <ul className='p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[100px] text-center hover:bg-indigo-600 transition-all ease-in duration-200'>
          <Link href="/login">Login</Link>
        </ul>
        <ul className='p-1 tablet:p-2 rounded-md bg-slate-300 desktop:w-[100px] text-center hover:bg-slate-400 transition-all ease-in duration-200'>
          <Link href="/register">Register</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar