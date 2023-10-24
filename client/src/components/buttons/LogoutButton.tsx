"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = (): React.ReactElement => {
    const router = useRouter();

   const handleOnClick = () => {
    sessionStorage.clear();

    const getJwtSessionStaff = sessionStorage.getItem('jwtSession');
    const getJwtSessionCustomer = sessionStorage.getItem('customerJwtSession');
    if (!getJwtSessionStaff || !getJwtSessionCustomer) {
        alert('Usuario deslogueado') //! ALERT TEMPORAL
        router.push('/');
        window.location.reload();
    } 
  };
  return (
    <button onClick={handleOnClick} className="font-bold p-1 tablet:p-2 rounded-md bg-red-400 desktop:w-[100px] text-center hover:bg-red-500 hover:text-white transition-all ease-in duration-200 capitalize">
      Logout
    </button>
  );
};

export default LogoutButton;
