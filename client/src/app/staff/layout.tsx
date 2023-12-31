"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import { useGlobalContext } from "@/hooks/useContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const StaffLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const { isAuthorized, setIsAuthorized } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("jwtSession")) {
      const getDepartment = sessionStorage.getItem("zxcvbn");
      if (getDepartment === "h") router.push("/hhrr/hhrrpanel");
      if (getDepartment === "a") router.push("/staff/staffpanel");
      return setIsAuthorized(true);
    }
    if (sessionStorage.getItem("isCustomer") === "c")
      router.push("/customer/homebanking");
    else {
      router.push("/login-staff");
      setIsAuthorized(false);
    }
  }, []);
  return (
    <>
      {isAuthorized && (
        <nav className="flex items-center justify-between border-[#bccc9c] h-[100px] overflow-hidden bg-[#00563F]">
          <Link
            href="/staff/staffpanel"
            className=" text-xl uppercase font-bold  tablet:text-2xl p-5"
          >
            <Image src="/logo/logoblanco.png" width={110} height={100} className="w-full h-full" alt="logo-easy"/>
          </Link>
          {isAuthorized && (
            <div className="p-4 flex items-center gap-5">
              <Link
                className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] desktop:p-3 desktop:text-lg text-center  hover:text-white transition-all ease-in duration-200 capitalize eb-button"
                href="/staff/staffpanel"
              >
                Panel Staff
              </Link>
              <LogoutButton />
            </div>
          )}
        </nav>
      )}
      {children}
    </>
  );
};

export default StaffLayout;
