"use client";
import { useGlobalContext } from "@/hooks/useContext";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = (): React.ReactElement => {
  const router = useRouter();
  const { isAuthorized } = useGlobalContext();

  const handleOnClick = () => {
    const userWay = confirm("¿Seguro que quiere cerrar la sesión?");
    if (userWay) {
      sessionStorage.clear();

      const getJwtSessionStaff = sessionStorage.getItem("jwtSession");
      const getJwtSessionCustomer = sessionStorage.getItem("customerJwtSession");
      if (!getJwtSessionStaff || !getJwtSessionCustomer) {
        router.push("/");
        if (isAuthorized) window.location.reload();
      }
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className="bg-[#FF5722] text-black hover:bg-red-500 font-bold p-2 tablet:p-2 rounded-md desktop:w-[140px] desktop:p-3 text-center text-xs tablet:text-xl hover:text-white transition-all ease-in duration-200 capitalize"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
