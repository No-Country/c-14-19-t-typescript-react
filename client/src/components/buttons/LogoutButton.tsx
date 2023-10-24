"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = (): React.ReactElement => {
  const router = useRouter();

  const handleOnClick = () => {
    sessionStorage.removeItem("jwtSession");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("zxcvbn");
    sessionStorage.removeItem("authorized");

    const getJwtSession = sessionStorage.getItem("jwtSession");
    if (!getJwtSession) {
      alert("Usuario deslogueado"); //! ALERT TEMPORAL
      router.push("/");
      window.location.reload();
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="font-bold p-1 tablet:p-2 rounded-md  desktop:w-[100px] text-center  hover:text-white transition-all ease-in duration-200 capitalize eb-buttonCancel"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
