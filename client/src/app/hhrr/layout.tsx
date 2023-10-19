"use client"
import LogoutButton from '@/components/buttons/LogoutButton';
import NavbarLink from '@/components/links/NavbarLink';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HHRRLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        if (sessionStorage.getItem('jwtSession')) return setIsAuthenticated(true)
        else {
            router.push('/')
            setIsAuthenticated(false);
        }
    }, [])
    
  return (
    <>
      <nav className="flex items-center justify-between border">
        <Link href='/hhrr/hhrrpanel' className="p-2 text-xl uppercase font-bold tablet:p-5 tablet:text-2xl">
          Logo
        </Link>
        {isAuthenticated && (
          <ul className="h-[90px] flex items-center gap-3 p-3 tablet:gap-5 tablet:p-5">
            <NavbarLink route="/staff/customers" content="Ver Staff Members" />
            <LogoutButton />
            {/* <NavbarLink route="/hhrr/hhrrpanel" content="Staff panel"/> */}
          </ul>
        )}
      </nav>
      {children}
    </>
  )
}

export default HHRRLayout