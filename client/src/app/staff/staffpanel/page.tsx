"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { nunito } from "@/fonts/fonts";
import Loader from "@/components/Loader";

// ! HACER LA PETICION PARA VER EL USUARIO
const PageStaffPanel = (): React.ReactElement => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const getDepartment = sessionStorage.getItem("department");
    if (getDepartment !== "attention") return setIsAuth(false);
    else return setIsAuth(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[94vh] tablet:h-[92vh]">
      {isAuth ? (
        <div
          className={`${nunito.className} h-full w-full flex flex-col items-center border-4 border-blue-300 bg-green-50`}
        >
          <div className="h-2/5 tablet:h-2/4 tablet:text-4xl desktop:text-6xl text-3xl flex items-center">
            <h2 className="overflow-y-hidden">Bienvenido de vuelta "x"</h2>
          </div>

          <div className="flex flex-col tablet:flex-row tablet:gap-14 gap-7 font-light text-center">
            <Link
              className="border rounded-md desktop:text-4xl desktop:p-5  border-black text-3xl p-2 bg-indigo-500"
              href="/staff/customer/register-customer"
            >
              Registar cliente
            </Link>
            <Link
              className="border rounded-md desktop:text-4xl desktop:p-5 border-black text-3xl p-2 bg-indigo-500"
              href="/staff/searchcustomer"
            >
              Buscar cliente
            </Link>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PageStaffPanel;
