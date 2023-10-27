"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TransferencesPage = (): React.ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const isCustomer = sessionStorage.getItem("isCustomer");
    if (!isCustomer) router.push("/");
}, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl text-center font-bold p-1 mb-10 tablet:text-4xl desktop:text-5xl overflow-hidden">
        ¿Qué tipo de <span className="text-[#788b61]">transferencia</span> desea
        realizar?
      </h1>
      <div className="flex justify-between items-center text-center p-4 gap-5 tablet:mt-5 tablet:w-[50%]">
        <Link
          href="/customer/homebanking/transference-panel/my-account-transferences"
          className="flex justify-center items-center rounded p-2 w-[50%] h-full font-bold bg-[#306a46] hover:bg-[#788b61] text-white hover:text-[#112a1b] transition-all ease-in duration-150 tablet:text-xl desktop:text-2xl tablet:p-5"
        >
          Transferir entre mis cuentas
        </Link>
        <Link
          href="/"
          className="flex justify-center items-center rounded p-2 w-[50%] h-full font-bold bg-[#306a46] hover:bg-[#788b61] text-white hover:text-[#112a1b] transition-all ease-in duration-150 tablet:text-xl desktop:text-2xl tablet:p-5"
        >
          Transferir a un tercero
        </Link>
      </div>
    </div>
  );
};

export default TransferencesPage;
