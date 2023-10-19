"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StaffLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jwtSession")) {
      const getDepartment = sessionStorage.getItem("department");
      if (getDepartment === "hhrr") router.push("/hhrr/home");
      if (getDepartment === "attention") router.push("/staff/staffpanel");
      return setIsAuthenticated(true);
    } else {
      router.push("/");
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      {isAuthenticated && (
        <nav className="flex items-center justify-between border">
          <Link
            href="/"
            className="p-2 text-xl uppercase font-bold tablet:p-5 tablet:text-2xl"
          >
            Logo
          </Link>
          {isAuthenticated && (
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
