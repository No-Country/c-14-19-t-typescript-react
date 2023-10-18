"use client";
import HomeStaff from '@/components/HomeStaff'
import { getSession } from '@/utils/getJwtSession';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface UserStaff {
  jwt: string;
  staff: {
      department: string,
      id: string
  }
  user: {
      birthday: string
      cellphone: string
      dni: number
      id: string
      lastname: string
      mail: string
      name: string
      reference_code: string
      role: string
  }
  username: string
};

const userResponse: UserStaff = {
  jwt: "",
    staff: { department: "", id: "" },
    user: {
      birthday: '',
      cellphone: '',
      dni: 0,
      id: '',
      name: '',
      lastname: '',
      mail: '',
      reference_code: '',
      role: ''
    },
    username: ''
}

const PageStaff = (): React.ReactElement => {
  const router = useRouter();
  const [newToken, setNewToken] = useState<string>('');
  const [user, setUser] = useState<UserStaff>(userResponse);
    
    useEffect(() => {
        const jwtSession = sessionStorage.getItem('jwtSession');
        
        const fetchData = async () => {
            const result = await getSession(jwtSession)
            if (!jwtSession) router.push('/login-staff');
            if (sessionStorage.getItem('department') === 'hhrr') router.push('/hhrr/home')
            if (sessionStorage.getItem('department') === 'attention') router.push('/staff/staffpanel')
            else result && setNewToken(result.jwt), setUser(result) // Estados para crear el loader y el nuevo token
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