"use client";
import { idAcount } from "@/components/staff/interfaces/staff.interface";
import { createAccount } from "@/utils/accountsRequest";
import { getCustomerSession, getSession } from "@/utils/getJwtSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = ({ params }: any): React.ReactElement => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);

  const handleCreateAcont = async () => {
    setLoader(false);
    const request: idAcount = {
      id_user: params.id,
    };
    const data = await createAccount(request);
    if (data.msg) {
      setLoader(true);
      alert(data.msg);
    } else {
      setLoader(true);
    }
    router.push(`/staff/searchcustomer/${params.dni}`);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h2 className="mb-20 text-4xl overflow-y-hidden">
        ¿Quieres crear una cuenta nueva?
      </h2>
      <div className="flex gap-5 justify-center">
        <Link
          href={`/staff/searchcustomer/${params.dni}`}
          className="font-bold p-1 tablet:p-2 rounded-md bg-[#eb7344] desktop:w-[100px] text-center hover:bg-[#FF5722] hover:text-white transition-all ease-in duration-200 capitalize"
        >
          Volver
        </Link>
        <button
          onClick={handleCreateAcont}
          className="font-bold p-1 tablet:p-2 rounded-md bg-[#00796B] desktop:w-[100px] text-center hover:bg-[#00563F] hover:text-white transition-all ease-in duration-200 capitalize"
        >
          {loader ? "Crear" : "Creando..."}
        </button>
      </div>
    </div>
  );
};

export default page;
