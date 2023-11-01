"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { nunito } from "@/fonts/fonts";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";

const PageStaffPanel = (): React.ReactElement => {
  const router = useRouter();
  const { isAuthorized, username, setIsAuthorized, setUsername } =
    useGlobalContext();

  useEffect(() => {
    const getDepartment = sessionStorage.getItem("zxcvbn");
    const getUsername = sessionStorage.getItem("username");
    if (getDepartment === "a") {
      setIsAuthorized(true);
      if (getUsername) return setUsername(getUsername);
    } else {
      router.push("/login-staff");
      return setIsAuthorized(false);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] tablet:h-[92vh]">
      {isAuthorized ? (
        <div
          className={`${nunito.className} h-full w-full flex flex-col justify-center items-center bg-[#e7e7d9]`}
        >
          <div className="h-[30%] tablet:h-[25%] tablet:text-4xl desktop:text-6xl text-3xl flex flex-col justify-center items-center gap-5 mobile:text-center">
            <h2 className="overflow-y-hidden h-full">
              ¡Bienvenido/a de vuelta{" "}
              <span className="font-bold text-4xl desktop:text-6xl text-[#FF5722]">
                {username}
              </span>
              !
            </h2>
            <div className="flex flex-col items-center justify-center tablet:flex-row tablet:gap-14 gap-7 font-light text-center h-full overflow-hidden">
              <Link
                className="flex justify-center items-center shadow-md rounded-md desktop:text-2xl font-bold text-2xl tablet:p-5 bg-[#306a46] hover:bg-[#788b61] text-white transition-all ease-in duration-150 p-3 w-[230px] overflow-hidden"
                href="/staff/customer/register-customer"
              >
                Registar cliente
              </Link>
              <Link
                className="flex justify-center items-center shadow-md rounded-md desktop:text-2xl font-bold text-2xl tablet:p-5 bg-[#306a46] hover:bg-[#788b61] text-white transition-all ease-in duration-150 p-3 w-[230px] overflow-hidden"
                href="/staff/searchcustomer"
              >
                Buscar cliente
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PageStaffPanel;
