"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { nunito } from "@/fonts/fonts";
import LogoutButton from "./buttons/LogoutButton";
import { useGlobalContext } from "@/hooks/useContext";
import Image from "next/image";
import "../app/custom.css";
import MyAccountButton from "./buttons/MyAccountButton";

const NavbarHome = (): React.ReactElement => {
  const { isAuthorized, setIsAuthorized } = useGlobalContext();
  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    const getSession = sessionStorage.getItem("jwtSession");
    const getDepartment = sessionStorage.getItem("zxcvbn");

    // Comprobar si el usuario está autenticado
    const getAuthStaff = sessionStorage.getItem("authorized");
    const getAuthCustomer = sessionStorage.getItem("isCustomer");
    if (getAuthStaff) setIsAuthorized(!!getAuthStaff);
    if (getAuthCustomer) setIsAuthorized(!!getAuthCustomer);

    // Obtener sesion y checkear departamento
    if (getSession) {
      if (getDepartment === "h") return setRoute("/hhrr/hhrrpanel");
      if (getDepartment === "a") return setRoute("/staff/staffpanel");
    }
  }, []);

  return (
    <nav
      className={`flex ${nunito.className} items-center p-3 tablet:h-24 tablet:pr-5 desktop:h-[120px] max-h-[120px] justify-between no-scrollbar bg-transparent absolute w-full z-50 overflow-y-hidden`}
    >
      <div className="text-xl uppercase font-bold tablet:p-2 ">
        <Link href="/">
          <Image
            src="/logo/logoblanco.png"
            height={120}
            width={120}
            alt="logo-easy"
            className="h-full w-full"
          />
        </Link>
      </div>

      <div className="flex gap-3 font-medium tablet:text-xl">
        <ul className="flex gap-5">
          {!isAuthorized && (
            <>
              <Link
                href="/customer/login"
                className="font-bold p-1 tablet:p-1 flex items-center justify-center rounded-md desktop:w-[200px] hover:text-white transition-all ease-in duration-200 capitalize eb-button"
              >
                Login
              </Link>
              <Link
                href="/customer/register"
                className="font-bold p-1 tablet:p-1 flex items-center justify-center rounded-md  desktop:w-[200px] hover:text-white transition-all ease-in duration-200 capitalize eb-button"
              >
                Register
              </Link>
            </>
          )}
          {isAuthorized && (
            <div className="flex items-center gap-5">
              <MyAccountButton/>
              <LogoutButton />
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarHome;
