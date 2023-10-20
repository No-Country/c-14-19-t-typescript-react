"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const HomeBanking = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('isCustomer') === null) router.push('/'); 
  }, []);
  return (
    <div>HomeBanking</div>
  )
}

export default HomeBanking