"use client"
import React, { useEffect, useState } from "react";
import { deleteAccountClient, getAccountListClient } from "@/utils/accountsRequest";
import { setTimeout } from "timers";
import { account } from "@/components/staff/interfaces/staff.interface";
import Link from "next/link";
import Loader from "@/components/Loader";

const BankAccounts = ({ params }: any): React.ReactElement => {
    const [accountsList, setAccountsList] = useState<Array<account>>([]);
    const [accounts, setAccounts] = useState<boolean>(false);
    const [reLoad, setReload] = useState<boolean>(false);
    const [loadingButtonIndex, setLoadingButtonIndex] = useState<number | null>(null);

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
                setReload(true)
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoadingButtonIndex(null);
        }, 1300);
        setReload(false)
        setAccounts(true)
        const fetchData = async () => {
            const acounts = await getAccountListClient(params.listAccounts);
            setTimeout(() => {
                setAccountsList(acounts);
                setAccounts(false)
            }, 300);
        };
        fetchData();
    }, [params.listAccounts, reLoad]);


    return (
        <div className="flex flex-col items-center pt-10 gap-16">
            <h2 className="text-3xl overflow-y-hidden">Tus Cuentas</h2>
            <div className="border  border-green-800 w-11/12 max-w-xl  flex  flex-col gap-5 p-3 ">
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
                            <div className="flex gap-5">
                                <Link
                                    href={`/customer/homebanking/${params.listAccounts}/${account.number_account}`}
                                    className="font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[100px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel"
                                >
                                    Consultar
                                </Link>
                                <button
                                    onClick={() => deleteAccount(account.number_account, account.money, index)}
                                    className={`font-bold p-1 tablet:p-2 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[100px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel ${loadingButtonIndex === index ? "pointer-events-none" : ""
                                        }`}
                                >
                                    {loadingButtonIndex === index ? "Eliminando..." : "Eliminar"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link
                href={`/customer/homebanking/${params.listAccounts}/create-account`}
                className="font-bold p-1 tablet:p-1 rounded-md bg-[#329556] hover:bg-[#008868] desktop:w-[300px] text-center hover:text-white transition-all ease-in duration-200 capitalize eb-button"
            >
                Crear Nueva
            </Link>
        </div>

    );
};

export default BankAccounts;