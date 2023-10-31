"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import NavbarLink from "@/components/links/NavbarLink";
import { useGlobalContext } from "@/hooks/useContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HHRRLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized, setIsAuthorized } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("jwtSession")) {
      const getDepartment = sessionStorage.getItem("zxcvbn");
      if (getDepartment === "a") router.push("/staff/staffpanel");
      setIsAuthorized(true);
    } else {
      router.push("/login-staff");
      setIsAuthorized(false);
    }
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between border h-[90px] overflow-hidden">
        <Link
          href="/hhrr/hhrrpanel"
          className="text-xl uppercase font-bold tablet:text-2xl p-5"
        >
          <Image src="/logo/easy2.png" width={120} height={100} alt="logo-easy" />
        </Link>
        {isAuthorized && (
          <ul className="h-[90px] flex items-center gap-3 p-3 tablet:gap-5 tablet:p-5 overflow-hidden">
            <NavbarLink route="/staff/customers" content="Ver Staff Members" />
            <LogoutButton />
            {/* <NavbarLink route="/hhrr/hhrrpanel" content="Staff panel"/> */}
          </ul>
        )}
      </nav>
      {children}
    </>
  );
};

export default HHRRLayout;
