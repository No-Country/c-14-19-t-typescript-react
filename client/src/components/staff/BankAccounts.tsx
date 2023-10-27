import React, { useEffect, useState } from 'react'
import { account } from './interfaces/staff.interface';
import { getAccountList } from '@/utils/accountsRequest';
import { setTimeout } from 'timers';


const BankAccounts = (id: any): React.ReactElement => {
    const [accountsList, setAccountsList] = useState<Array<account>>([]);
    useEffect(() => {
        
        const fetchData = async () => {
            const acounts = await getAccountList(id.id)
            setTimeout(()=>{
                setAccountsList(acounts)
            }, 300)
        }
        fetchData();

    }, [id])

    return (
        <div className="border  border-green-800 w-3/4 max-w-xl  flex  flex-col gap-5 p-3 ">
            {accountsList.length === 0 ? <div className='flex justify-center'>Buscando Cuentas... </div>
            :  
            accountsList.map((account: any, index: any) => (
                <div
                    key={index}
                    className="flex justify-around items-center overflow-y-hidden"
                >
                    <p className=" text-red-400">{account.number_account}</p>
                    <p className=" text-red-500">${account.money}</p>
                    {/* Pasar este div a un componente para hacer el delete de la cuenta */}
                    <button className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[100px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel">
                        Eliminar
                    </button>
                </div>
            ))
            }
        </div>
    )
}

export default BankAccounts