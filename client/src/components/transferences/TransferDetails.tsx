"use client";
import { useGlobalContext } from "@/hooks/useContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TransferDetails = (): React.ReactElement => {
  const { transference } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (transference.amount === 0)
      return router.push("/customer/homebanking/transference-panel/");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-16 tablet:w-[90%] desktop:w-[50%]">
      <h1 className="font-bold text-2xl text-center tablet:text-4xl desktop:text-5xl overflow-hidden">
        Transferencia realizada con éxito
      </h1>
      <ul className="flex flex-col gap-5 text-lg tablet:text-3xl desktop:text-4xl">
        <li className="overflow-hidden">
          Desde:{" "}
          <span className="text-[#474343] text-xl font-bold tablet:text-2xl desktop:text-3xl">
            {transference.sender_number_account}
          </span>
        </li>
        <li className="overflow-hidden">
          Para:{" "}
          <span className="text-[#474343] text-xl font-bold tablet:text-2xl desktop:text-3xl">
            {transference.receiver_number_account}
          </span>
        </li>
        <li className="overflow-hidden">
          Monto:{" "}
          <span className="text-[#474343] text-xl font-bold tablet:text-2xl desktop:text-3xl">
            ${transference.amount}
          </span>
        </li>
      </ul>

      <div className="flex justify-center items-center w-full gap-10 p-2">
        <Link
          href="/customer/homebanking/transference-panel"
          className="w-[40%] text-center text-white bg-[#306a46] p-2 rounded hover:bg-[#788b61] hover:text-black transition-all ease-in duration-150 font-bold tablet:p-4 tablet:text-xl desktop:text-2xl desktop:p-5"
        >
          Realizar otra transferencia
        </Link>
        <Link
          href="/customer/homebanking"
          className="w-[40%] text-center text-white bg-[#306a46] p-2 rounded hover:bg-[#788b61] hover:text-black transition-all ease-in duration-150 font-bold tablet:p-4 tablet:text-xl desktop:text-2xl desktop:p-5"
        >
          Menu principal
        </Link>
      </div>
    </div>
  );
};

export default TransferDetails;
