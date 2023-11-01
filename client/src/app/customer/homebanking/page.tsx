"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../../app/custom.css";
import { getCustomerSession } from "@/utils/getJwtSession";
import { UserData } from "@/components/user/interfaces/users.interface";
import { object } from "yup";
import Loader from "@/components/Loader";

const HomeBanking = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>();

  useEffect(() => {
    if (sessionStorage.getItem("isCustomer") === null) router.push("/");
    const name: string | null = sessionStorage.getItem("customerUser");
    setUserName(name);

    const getUser = async () => {
      const token = sessionStorage.getItem("customerJwtSession");
      const data = await getCustomerSession(token);
      //console.log(data.hbAccount.user.id);
      setUser(data.hbAccount.user);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col item-center justify-center gap-10 h-[93vh]">
        <h1 className="text-center text-2xl tablet:text-4xl overflow-y-hidden">
          Bienvenido de vuelta{" "}
          <span className="text-[#788b61] font-bold">{userName}</span>
        </h1>
        <div className="flex flex-col justify-center text-center gap-8 px-5 max-w-[700px]">
          <Link
            href="/customer/homebanking/transference-panel"
            className="overflow-y-hidden rounded-md desktop:text-4xl text-xl p-3 bg-[#306a46] hover:bg-[#788b61] text-white hover:text-black transition-all ease-in duration-200 h-[50%]"
          >
            Transferir
          </Link>
          <Link
            href={`/customer/homebanking/${user.id}`}
            className="overflow-y-hidden rounded-md desktop:text-4xl  text-xl p-3 bg-[#306a46] hover:bg-[#788b61] text-white hover:text-black transition-all ease-in duration-200 h-[50%]"
          >
            Gestion De Cuentas
          </Link>
          <Link
            href="/customer/homebanking/update-customer-info"
            className="overflow-y-hidden rounded-md desktop:text-4xl text-xl p-3 bg-[#306a46] hover:bg-[#788b61] text-white hover:text-black transition-all ease-in duration-200 h-[50%]"
          >
            Actualizar Datos Personales
          </Link>
          <Link
            href="/customer/homebanking/update-password"
            className="overflow-y-hidden rounded-md desktop:text-4xl  text-xl p-3 bg-[#306a46] hover:bg-[#788b61] text-white hover:text-black transition-all ease-in duration-200 h-[50%]"
          >
            Cambiar Contraseña
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default HomeBanking;
