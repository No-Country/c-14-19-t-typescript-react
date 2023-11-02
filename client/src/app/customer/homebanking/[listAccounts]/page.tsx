"use client";
import React, { useEffect, useState } from "react";
import {
  deleteAccountClient,
  getAccountListClient,
} from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { account } from "@/components/staff/interfaces/staff.interface";
import Link from "next/link";
import { useGlobalContext } from "@/hooks/useContext";

const BankAccounts = ({ params }: any): React.ReactElement => {
  const [accountsList, setAccountsList] = useState<Array<account>>([]);
  const [accounts, setAccounts] = useState<boolean>(false);
  const [reLoad, setReload] = useState<boolean>(false);
  const [loadingButtonIndex, setLoadingButtonIndex] = useState<number | null>(
    null
  );
  const { isLoading, setIsLoading } = useGlobalContext();

  const deleteAccount = async (id: string, money: number, index: number) => {
    setLoadingButtonIndex(index);
    if (money > 0) {
      setLoadingButtonIndex(null);
      alert("No se puede eliminar una cuenta con dinero.");
    } else {
      const response = confirm("¿Seguro que quiere eliminar al cliente?");
      if (response) {
        const res = await deleteAccountClient(id);
        alert(res.msg);
        setReload(true);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadingButtonIndex(null);
    }, 1300);
    setReload(false);
    setAccounts(true);
    const fetchData = async () => {
      const acounts = await getAccountListClient(params.listAccounts);
      setIsLoading(false);
      setAccountsList(acounts);
      setAccounts(false);
    };
    fetchData();
  }, [params.listAccounts, reLoad]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-5 p-4 gap-[2rem]">
      <h2 className="text-2xl font-bold mt-4 tablet:mt-0 tablet:text-3xl overflow-y-hidden">
        Tus Cuentas
      </h2>
      <div className=" shadow-stone-700 shadow-md w-[90%] tablet:w-[100%] h-full desktop:w-[60%] items-center justify-center flex  flex-col gap-5 pb-5 pt-5">
        {accountsList.length === 0 ? (
          <div className="flex justify-center">
            {accounts ? "Buscando cuentas..." : "No se encontraron cuentas"}
          </div>
        ) : (
          accountsList.map((account: any, index: any) => (
            <div
              key={index}
              className="flex flex-col tablet:flex-row items-center max-w-[700px] desktop:w-[685px] w-full tablet:justify-between justify-start mt-3 gap-3 tablet:gap-10  p-2 text-lg  overflow-y-hidden"
            >
              <p className="overflow-y-hidden text-[#333333]">
                {account.number_account}
              </p>
              <p className=" text-[#FF5722] font-bold p-1 overflow-hidden">
                ${account.money}
              </p>
              <div className="flex gap-5">
                <Link
                  href={`/customer/homebanking/${params.listAccounts}/${account.number_account}`}
                  className="overflow-y-hidden flex items-center justify-center font-bold p-1 tablet:p-2 rounded-md text-[#333333] bg-[#329556] hover:bg-[#008868] desktop:w-[120px] text-center hover:text-white transition-all ease-in duration-200 capitalize "
                >
                  Consultar
                </Link>
                <button
                  onClick={() =>
                    deleteAccount(account.number_account, account.money, index)
                  }
                  className={`overflow-y-hidden flex items-center justify-center font-bold p-3 text-[#333333] tablet:p-2 rounded-md bg-[#FFA17A] hover:bg-[#FF5722] desktop:w-[120px] text-center hover:text-white transition-all ease-in duration-200 capitalize ${
                    loadingButtonIndex === index ? "pointer-events-none" : ""
                  }`}
                >
                  {loadingButtonIndex === index ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))
        )}
        {accountsList.length >= 5 || isLoading ? (
          ""
        ) : (
          <Link
            href={`/customer/homebanking/${params.listAccounts}/create-account`}
            className="font-bold p-3 tablet:p-1 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-button overflow-hidden"
          >
            Crear Nueva
          </Link>
        )}
      </div>
    </div>
  );
};

export default BankAccounts;
