import Link from "next/link";
import React from "react";

const MyAccountButton = () => {
  return (
    <Link
      href="/customer/homebanking"
      className="bg-[#00796B] hover:bg-[#008868] font-bold p-2 tablet:p-2 rounded-md desktop:w-[140px] desktop:p-3 text-center text-black text-xs tablet:text-xl hover:text-white transition-all ease-in duration-200 capitalize"
    >
      Cuenta
    </Link>
  );
};

export default MyAccountButton;
