"use client";
import Loader from '@/components/Loader'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HomeHHRPage = (): React.ReactElement => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const getDepartment = sessionStorage.getItem("zxcvbn");
    const getUsername = sessionStorage.getItem('username');
    if (getDepartment === 'h') {
      setIsAuth(true);
      if (getUsername) return setUsername(getUsername);
    }
    else {
      router.push('/login-staff')
      return setIsAuth(false);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[94vh] tablet:h-[92vh]">
    {isAuth ? (
      <div
        className="h-full w-full flex flex-col items-center border-4 bg-slate-100"
      >
        <div className="h-2/5 tablet:h-2/4 tablet:text-4xl desktop:text-6xl text-3xl flex items-center">
          <h2 className="overflow-y-hidden">Bienvenido de vuelta {username}</h2>
        </div>

        <div className="flex flex-col tablet:flex-row tablet:gap-14 gap-7 font-light text-center">
          <Link
            className="border rounded-md desktop:text-4xl desktop:p-5  border-black text-3xl p-2 bg-indigo-500"
            href="/hhrr/register-staff"
          >
            Registar staff
          </Link>
        </div>
      </div>
    ) : (
      <Loader />
    )}
  </div>
  )
}

export default HomeHHRPage