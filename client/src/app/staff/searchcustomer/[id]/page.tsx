"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientDelete, clietnSearch } from "@/utils/dniRequest";
import { UserData } from "@/components/user/interfaces/users.interface";
import Loader from "@/components/Loader";

interface Cuenta {
  n: number;
  p: string;
}

const cuentas: Cuenta[] = [
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" },
  { n: 1234578, p: "$50" },
];

const Page = ({ params }: any): React.ReactElement => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  const deleteCustomer = () => {
    const response = confirm("¿Seguro que Quiere eliminar al cliente?");
    if (response) {
      clientDelete(userData?.id);
      router.push(`/staff/searchcustomer`);
    } else return;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await clietnSearch(parseInt(params.id));

        if (data === "error") router.push(`/staff/searchcustomer`);
        else setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  return (
    <div className="h-screen border-green-600 border-2 flex flex-col items-center justify-center gap-12 tablet:p-5">
      <h2 className="text-2xl tablet:text-4xl overflow-y-hidden">
        <span className=" font-black">Cliente: </span>
        {`${userData.name[0].toUpperCase()}${userData.name.slice(1)}`}{" "}
        {`${userData.lastname[0].toUpperCase()}${userData.lastname.slice(1)}`}
      </h2>
      <div className="flex gap-5 tablet:text-lg tablet:gap-10 items-center overflow-y-hidden">
        <Link
          href={`/staff/searchcustomer/${params.id}/${userData.id}`}
          className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[300px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-button"
        >
          Actualizar Datos
        </Link>
        <button
          onClick={deleteCustomer}
          className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[300px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-button"
        >
          Eliminar Cliente
        </button>
      </div>
      <h3 className="text-2xl tablet:text-3xl overflow-y-hidden">
        Cuentas Bancarias
      </h3>
      <div className="border  border-green-800 w-3/4 max-w-xl  flex  flex-col gap-5 p-3 ">
        {cuentas.map((cuenta, index) => (
          <div
            key={index}
            className="flex justify-around items-center overflow-y-hidden"
          >
            <p className=" text-red-400">{cuenta.n}</p>
            <p className=" text-red-500">{cuenta.p}</p>
            {/* Pasar este div a un componente para hacer el delete de la cuenta */}
            <button className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[100px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel">
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="font-bold p-1 tablet:p-1 rounded-md bg-indigo-500 desktop:w-[300px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-button"
      >
        Crear Nueva
      </Link>
    </div>
  );
};

export default Page;
