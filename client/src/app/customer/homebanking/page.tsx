"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../../app/custom.css";

const HomeBanking = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("isCustomer") === null) router.push("/");
    const name: string | null = sessionStorage.getItem("customerUser");
    setUserName(name);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <nav className="flex items-center justify-between border w-full px-2">
        {
          <Link
            href="/"
            className="p-2 text-xl uppercase font-bold tablet:p-3 tablet:text-2xl"
          >
            <Image
              src="/logo/easy2.png"
              width={120}
              height={100}
              alt="logo-easy"
            />
          </Link>
        }
        <LogoutButton />
      </nav>

      <div className="flex flex-col item-center justify-center gap-10 h-[93vh]">
        <h1 className="text-center text-2xl tablet:text-4xl overflow-y-hidden">
          Bienvenido de vuelta{" "}
          <span className="text-[#788b61] font-bold">{userName}</span>
        </h1>
        <div className="flex flex-col justify-center text-center gap-8 px-5 max-w-[700px]">
          <Link
            href="/"
            className="overflow-y-hidden shadow-md  rounded-md desktop:text-3xl text-xl p-3  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%] eb-button"
          >
            Tranferir
          </Link>
          <Link
            href="/"
            className="overflow-y-hidden shadow-md  rounded-md desktop:text-3xl text-xl p-3  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%] eb-button"
          >
            Gestion De Cuentas
          </Link>
          <Link
            href="/customer/homebanking/update-customer-info"
            className="overflow-y-hidden shadow-md  rounded-md desktop:text-3xl text-xl p-3  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%] eb-button"
          >
            Actualizar Datos Personales
          </Link>
          <Link
            href="/customer/homebanking/update-password"
            className="overflow-y-hidden shadow-md  rounded-md desktop:text-3xl text-xl p-3  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%] eb-button"
          >
            Cambiar Contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanking;
