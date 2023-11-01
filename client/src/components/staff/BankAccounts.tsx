"use client"
import React, { useEffect, useState } from "react";
import { account } from "./interfaces/staff.interface";
import { useRouter } from "next/navigation";
import { getAccountList } from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { deleteAccountRequest } from "@/utils/accountsRequest";

const BankAccounts = (id: any): React.ReactElement => {
  const [accountsList, setAccountsList] = useState<account[]>([]);
  const [accounts, setAccounts] = useState<boolean>(false);
  const [reLoad, setReload] = useState<boolean>(false);

  const deleteAccount = async (id: string, money: number) => {
    if (money > 0) {
      alert("No se puede eliminar una cuenta con dinero.");
    } else {
      const response = confirm("¿Seguro que quiere eliminar al cliente?");
      if (response) {
        const res = await deleteAccountRequest(id);
        alert(res.msg);
        setReload(true)
      }
    }
  };

  useEffect(() => {
    setReload(false)
    setAccounts(true)
    const fetchData = async () => {
      const acounts = await getAccountList(id.id);
      setTimeout(() => {
        setAccountsList(acounts);
        setAccounts(false)
      }, 300);
    };
    fetchData();
  }, [id, reLoad]);

  return (
    <div className="border  border-green-800 w-3/4 max-w-xl  flex  flex-col gap-5 p-3 ">
      {accountsList.length === 0 ? (
        <div className="flex justify-center">{accounts ? 'Buscando cuentas...' : 'No se encontraron cuentas'}</div>
      ) : (
        accountsList.map((account: any, index: any) => (
          <div
            key={index}
            className="flex justify-around items-center overflow-y-hidden"
          >
            <p className=" text-[#41542a]">{account.number_account}</p>
            <p className=" text-green-500 font-bold">${account.money}</p>
            <button onClick={() => deleteAccount(account.number_account, account.money)} className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[100px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel">
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BankAccounts;
