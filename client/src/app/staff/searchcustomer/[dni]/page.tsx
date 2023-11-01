"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientDelete, clietnSearch } from "@/utils/dniRequest";
import { UserData } from "@/components/user/interfaces/users.interface";
import Loader from "@/components/Loader";

import BankAccounts from "@/components/staff/BankAccounts";
import { useGlobalContext } from "@/hooks/useContext";

const Page = ({ params }: any): React.ReactElement => {
  const router = useRouter();
  const { setExists } = useGlobalContext();

  const [userData, setUserData] = useState<UserData | null>(null);

  const deleteCustomer = () => {
    const response = confirm("¿Seguro que Quiere eliminar al cliente?");
    if (response) {
      clientDelete(userData?.id);
      alert('La baja ha sido exitosa')
      router.push(`/staff/searchcustomer`);
    } else return;
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const user = await clietnSearch(parseInt(params.dni));

        if (user.status === 404) {
          setExists(false) 
          router.push("/staff/searchcustomer")
          setTimeout(() => {
            setExists(true)
          }, 3000);
        } 
        else setUserData(user), setExists(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchDataUser();
  }, [params.dni]);

  return (
    <>
      {userData ? (
        <div className="h-screen border-green-600 border-2 flex flex-col items-center justify-center gap-12 tablet:p-5">
          <h2 className="text-2xl tablet:text-4xl overflow-y-hidden">
            <span className=" font-black">Cliente: </span>
            {`${userData.name[0].toUpperCase()}${userData.name.slice(1)}`}{" "}
            {`${userData.lastname[0].toUpperCase()}${userData.lastname.slice(
              1
            )}`}
          </h2>
          <div className="flex gap-5 tablet:text-lg tablet:gap-10 items-center overflow-y-hidden">
            <Link
              href={`/staff/searchcustomer/${params.dni}/${userData.id}`}
              className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-button"
            >
              Actualizar Datos
            </Link>
            <button
              onClick={deleteCustomer}
              className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-button"
            >
              Eliminar Cliente
            </button>
          </div>
          <h3 className="text-2xl tablet:text-3xl overflow-y-hidden">
            Cuentas Bancarias
          </h3>

          <BankAccounts id={userData.id} />

          <Link
            href={`/staff/searchcustomer//${params.dni}/create-account/${userData.id}`}
            className="overflow-y-hidden font-bold p-1 tablet:p-1 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-button"
          >
            Crear Nueva
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[90vh]">
          {" "}
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default Page;
