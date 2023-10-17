"use client";
import NavbarLink from "@/components/links/NavbarLink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StaffLayout = ({ children, }: { children: React.ReactNode }): React.ReactElement => {
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
        <Link href='/' className="p-2 text-xl uppercase font-bold tablet:p-5 tablet:text-2xl">
          Logo
        </Link>
        {isAuthenticated && <div className="p-4">
          <Link href='/staff/staffpanel'>Panel Staff</Link>
          </div>}
      </nav>
      {children}
    </>
  );
};

export default StaffLayout;
