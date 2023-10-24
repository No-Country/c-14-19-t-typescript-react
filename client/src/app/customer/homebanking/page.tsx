"use client";
import LogoutButton from '@/components/buttons/LogoutButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const HomeBanking = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('isCustomer') === null) router.push('/');
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <nav className="flex items-center justify-between border w-full px-2">
        {<Link
          href="/"
          className="p-2 text-xl uppercase font-bold tablet:p-5 tablet:text-2xl"
        >
          Logo
        </Link> }
        <LogoutButton/>
      </nav >

      <div className='flex flex-col item-center justify-center gap-10 h-[93vh]'>
        <h1 className='text-center text-2xl tablet:text-4xl overflow-y-hidden'>Bienvenido de vuelta "X"</h1>
        <div className='flex flex-col justify-center text-center gap-8 px-5 max-w-[700px]'>
          <Link href="/" className="overflow-y-hidden shadow-md shadow-indigo-600 rounded-md desktop:text-4xl text-xl p-3 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]">
            Tranferir
          </Link>
          <Link href="/" className="overflow-y-hidden shadow-md shadow-indigo-600 rounded-md desktop:text-4xl  text-xl p-3 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]">
            Gestion De Cuentas
          </Link>
          <Link href="/" className="overflow-y-hidden shadow-md shadow-indigo-600 rounded-md desktop:text-4xl   text-xl p-3 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]">
            Actualizar Datos Personales
          </Link>
          <Link href="customer/homebanking/update-password" className="overflow-y-hidden shadow-md shadow-indigo-600 rounded-md desktop:text-4xl   text-xl p-3 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]">
            Cambiar Contraseña
          </Link>
        </div>
      </div>
    </div >
  )
}

export default HomeBanking