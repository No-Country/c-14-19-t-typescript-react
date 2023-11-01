"use client";
import React, { useEffect, useState } from "react";
import { getTransferListClient } from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { deleteAccountRequest } from "@/utils/accountsRequest";
import { account } from "@/components/staff/interfaces/staff.interface";
import Link from "next/link";

const page = ({ params }: any): React.ReactElement => {
  const [transfersList, setTransfersList] = useState<Array<any>>([]);
  const [transfer, setTransfer] = useState<boolean>(false);

  useEffect(() => {
    setTransfer(true)
    const fetchData = async () => {
      const tranfers = await getTransferListClient(params.transferList);
      setTimeout(() => {
        setTransfersList(tranfers);
        setTransfer(false)
      }, 300);
    };
    fetchData();
  }, [params.transferList]);

  return (
    <div className="flex h-screen flex-col items-center pt-10 gap-16">
      <h2 className="text-2xl text-center overflow-y-hidden">
        Ultimos movimientos de la cuenta:{" "}
        <span className=" text-[#FF5722]">{params.transferList}</span>{" "}
      </h2>
      <div className="w-11/12 max-w-xl  flex  flex-col gap-5 p-3 ">
        {transfersList.length === 0 ? (
          <div className="flex justify-center">{transfer ? 'Buscando transferencias...' : 'No se encontraron transferencias...'}</div>
        ) : (
          transfersList.map((account: any, index: any) => (
            <div
              key={index}
              className="flex justify-around items-center overflow-y-hidden border p-5 border-green-800"
            >
              <p className=" font-bold">
                De:{" "}
                <span className="text-[333333] font-normal">
                  {account.sender_account.user.name}{" "}
                  {account.sender_account.user.lastname}
                </span>{" "}
                <span className=" text-xs text-[#FF5722]">
                  {account.sender_account.number_account}{" "}
                </span>
              </p>
              <p className=" font-bold">
                Para:{" "}
                <span className="text-[333333] font-normal">
                  {account.receiver_account.user.name}{" "}
                  {account.receiver_account.user.lastname}{" "}
                </span>
                <span className=" text-xs text-[#FF5722]">
                  {account.receiver_account.number_account}{" "}
                </span>
              </p>
              <p className=" font-bold">Monto: <span className="text-[333333] font-normal">${account.amount}</span> </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
