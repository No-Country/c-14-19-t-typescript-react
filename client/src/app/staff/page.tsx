"use client";
import HomeStaff from '@/components/HomeStaff'
import { getSession } from '@/utils/getJwtSession';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PageStaff = (): React.ReactElement => {
  const router = useRouter();
  const [newToken, setNewToken] = useState<string>('');
    
    useEffect(() => {
        const jwtSession = sessionStorage.getItem('jwtSession');
        
        const fetchData = async () => {
            const result = await getSession(jwtSession)
            if (!jwtSession) router.push('/login-staff');
            if (sessionStorage.getItem('zxcvbn') === 'h') router.push('/hhrr/home')
            if (sessionStorage.getItem('zxcvbn') === 'a') router.push('/staff/staffpanel')
            else result && setNewToken(result.jwt) // Estados para crear el loader y el nuevo token
        }
        fetchData()
    }, [])
  return (
    <div>
        <HomeStaff token={newToken}/>
    </div>
  )
}

export default PageStaff