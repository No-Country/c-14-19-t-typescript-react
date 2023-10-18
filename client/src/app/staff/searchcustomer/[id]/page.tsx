"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { clietnSearch } from '@/utils/dniRequest';
import { UserData } from '@/components/user/interfaces/users.interface';


interface Cuenta {
  n: number;
  p: string;
}

const cuentas: Cuenta[] = [
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" }
];


const Page = ({ params }: any): React.ReactElement => {

  const [userData, setUserData] = useState<UserData | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params.id); 
        const data = await clietnSearch(parseInt(params.id));
        
        setUserData(data)
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='h-screen border-green-600 border-2 flex flex-col items-center justify-center gap-12 tablet:p-5'>
      <h2 className='text-2xl tablet:text-4xl overflow-y-hidden'><span className=' font-black'>Cliente: </span>{userData.name} {userData.lastname}</h2>
      <div className='flex gap-5 tablet:text-lg tablet:gap-10 items-center overflow-y-hidden'>
        <Link href='/' className='border border-green-700 p-1 bg-green-300 '>Actualizar Datos</Link>
        <Link href='/' className='border border-green-700  p-1 bg-green-300'>Eliminar Cliente</Link>
      </div>
      <h3 className='text-2xl tablet:text-3xl overflow-y-hidden'>Cuentas Bancarias</h3>
      <div className='border  border-green-800 w-3/4 max-w-xl  flex  flex-col gap-5 p-3 '>
        {cuentas.map((cuenta, index) => (
          <div key={index} className='flex justify-around items-center overflow-y-hidden'>
            <p className=' text-red-400'>{cuenta.n}</p>
            <p className=' text-red-500' >{cuenta.p}</p>
            {/* Pasar este div a un componente para hacer el delete de la cuenta */}
            <button className='border border-green-400 p-1 '>Eliminar</button>
          </div>
        ))}
      </div>
      <Link href='/' className='border p-1 border-green-700 bg-green-300 tablet:text-lg overflow-y-hidden' >Crear Nueva</Link>
    </div>
  );
};

export default Page;