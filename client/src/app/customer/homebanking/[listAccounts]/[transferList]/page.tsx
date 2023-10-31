"use client"
import React, { useEffect, useState } from "react";
import { getTransferListClient } from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { deleteAccountRequest } from "@/utils/accountsRequest";
import { account } from "@/components/staff/interfaces/staff.interface";
import Link from "next/link";

const page = ({ params }: any): React.ReactElement => {
    const [transfersList, setTransfersList] = useState<Array<any>>([]);


    useEffect(() => {
        const fetchData = async () => {
            const tranfers = await getTransferListClient(params.transferList);
            setTimeout(() => {
                setTransfersList(tranfers);
            }, 300);
        };
        fetchData();


    }, [params.transferList]);


    return (
        <div className="flex flex-col items-center pt-10 gap-16">
            <h2 className="text-2xl text-center overflow-y-hidden">Ultimos movimietos de la cuenta: <span className=" text-green-500">{params.transferList}</span>  </h2>
            <div className="w-11/12 max-w-xl  flex  flex-col gap-5 p-3 ">
                {transfersList.length === 0 ? (
                    <div className="flex justify-center">Buscando Transferencias... </div>
                ) : (
                    transfersList.map((account: any, index: any) => (
                        <div
                            key={index}
                            className="flex justify-around items-center overflow-y-hidden border p-5 border-green-800"
                        >
                            <p className=" text-[#41542a]">De: <span>{account.sender_account.user.name} {account.sender_account.user.lastname}</span> <span className=" text-xs">{account.sender_account.number_account} </span></p>
                            <p className=" text-[#41542a]">Para: <span>{account.receiver_account.user.name} {account.receiver_account.user.lastname}  </span><span className=" text-xs">{account.receiver_account.number_account} </span></p>
                            <p className=" text-[#41542a]">Monto: ${account.amount}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
};

export default page;