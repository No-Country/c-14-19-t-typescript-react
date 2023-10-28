"use client"
import React, { useEffect, useState } from "react";
import { account } from "./interfaces/staff.interface";
import { getAccountList } from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { deleteAccountRequest } from "@/utils/accountsRequest";

const BankAccounts = (id: any): React.ReactElement => {
  const [accountsList, setAccountsList] = useState<Array<account>>([]);

  const deleteAcount = async(id: string) => {
    const response = confirm("¿Seguro que Quiere eliminar al cliente?");
    if (response) {
      const res = await deleteAccountRequest(id);
      alert(res.msg)
      
      
    } else return;
  };

  useEffect(() => {
    const fetchData = async () => {
      const acounts = await getAccountList(id.id);
      setTimeout(() => {
        setAccountsList(acounts);
      }, 300);
    };
    fetchData();
  }, [id, deleteAcount]);


  return (
    <div className="border  border-green-800 w-3/4 max-w-xl  flex  flex-col gap-5 p-3 ">
      {accountsList.length === 0 ? (
        <div className="flex justify-center">Buscando Cuentas... </div>
      ) : (
        accountsList.map((account: any, index: any) => (
          <div
            key={index}
            className="flex justify-around items-center overflow-y-hidden"
          >
            <p className=" text-[#41542a]">{account.number_account}</p>
            <p className=" text-green-500 font-bold">${account.money}</p>
            {/* Pasar este div a un componente para hacer el delete de la cuenta */}
            <button onClick={()=> deleteAcount(account.number_account)} className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[100px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel">
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BankAccounts;
