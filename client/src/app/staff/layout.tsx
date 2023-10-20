"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import { useGlobalContext } from "@/hooks/useContext";
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
    if (sessionStorage.getItem('isCustomer') === 'c') router.push('/customer/homebanking')
    else {
      router.push("/login-staff");
      setIsAuthorized(false);
    }
  }, []);
  return (
    <>
      {isAuthorized && (
        <nav className="flex items-center justify-between border">
          <Link
            href="/"
            className="p-2 text-xl uppercase font-bold tablet:p-5 tablet:text-2xl"
          >
            Logo
          </Link>
          {isAuthorized && (
            <div className="p-4 flex gap-5">
              <Link
                className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[300px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize"
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
