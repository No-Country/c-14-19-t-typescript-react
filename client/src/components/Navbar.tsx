"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { nunito } from "@/fonts/fonts";
import LogoutButton from "./buttons/LogoutButton";
import { useGlobalContext } from "@/hooks/useContext";
import Image from "next/image";

const Navbar = (): React.ReactElement => {
  const { isAuthorized, setIsAuthorized } = useGlobalContext();
  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    const getSession = sessionStorage.getItem("jwtSession");
    const getDepartment = sessionStorage.getItem("zxcvbn");

    // Comprobar si el usuario está autenticado
    const getAuth = sessionStorage.getItem("authorized");
    setIsAuthorized(!!getAuth);

    // Obtener sesion y checkear departamento
    if (getSession) {
      if (getDepartment === "h") return setRoute("/hhrr/hhrrpanel");
      if (getDepartment === "a") return setRoute("/staff/staffpanel");
    }
  }, []);

  return (
    <nav
      className={`flex ${nunito.className} items-center p-3 tablet:h-24 tablet:pr-5 desktop:max-h-32 justify-between border border-b-2 shadow-lg no-scrollbar`}
    >
      <div className="p-1 tablet:text-2xl font-extrabold">
        <Link href="/">
        <Image src="/logo/easy2.png"  height={100} width={100} alt="logo-easy"/>
        </Link>
      </div>

      <div className="flex gap-3 font-medium tablet:text-xl">
        <ul className="flex gap-5">
          {!isAuthorized && (
            <>
              <Link
                href="/customer/login"
                className="font-bold p-1 tablet:p-1 flex items-center justify-center rounded-md bg-indigo-500 desktop:w-[200px]  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize"
              >
                Login
              </Link>
              <Link
                href="/customer/register"
                className="font-bold p-1 tablet:p-1 flex items-center justify-center rounded-md bg-indigo-500 desktop:w-[200px]  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize"
              >
                Register
              </Link>
            </>
          )}
          {isAuthorized && <LogoutButton />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
