"use client";
import { idAcount } from "@/components/staff/interfaces/staff.interface";
import { createAccountClient } from "@/utils/accountsRequest";
import { getCustomerSession, getSession } from "@/utils/getJwtSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }: any): React.ReactElement => {
  const router = useRouter();

  const handleCreateAcont = async () => {
    const request: idAcount = {
      id_user: params.listAccounts,
    };
    const data = await createAccountClient(request);

    if (data.msg) {
      alert(data.msg);
    } else {
      alert("Cuenta Creada corretamente");
    }

    router.push(`/customer/homebanking/${params.listAccounts}`);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h2 className="mb-20 text-4xl overflow-y-hidden">
        ¿Quieres crear una cuenta nueva?
      </h2>
      <div className="flex gap-5 justify-center">
        <Link
          href={`/customer/homebanking/${params.listAccounts}`}
          className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[100px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel"
        >
          Volver
        </Link>
        <button
          onClick={handleCreateAcont}
          className="font-bold p-1 tablet:p-2 rounded-md bg-indigo-500 desktop:w-[100px] text-center hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default page;
