"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { nunito } from "@/fonts/fonts";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";

const PageStaffPanel = (): React.ReactElement => {
  const router = useRouter();
  const { isAuthorized, username, setIsAuthorized, setUsername } = useGlobalContext();

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
    <div className="flex flex-col justify-center items-center h-[94vh] tablet:h-[92vh]">
      {isAuthorized ? (
        <div
          className={`${nunito.className} h-full w-full flex flex-col items-center border-4 border-blue-300 bg-green-50`}
        >
          <div className="h-2/5 tablet:h-2/4 tablet:text-4xl desktop:text-6xl text-3xl flex items-center">
            <h2 className="overflow-y-hidden">
              Bienvenido de vuelta{" "}
              <span className="font-bold text-indigo-600 text-4xl desktop:text-6xl">
                {username}
              </span>
            </h2>
          </div>

          <div className="flex flex-col tablet:flex-row tablet:gap-14 gap-7 font-light text-center h-[20%]">
            <Link
              className="shadow-md shadow-indigo-600 rounded-md desktop:text-4xl font-bold  text-3xl p-5 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]"
              href="/staff/customer/register-customer"
            >
              Registar cliente
            </Link>
            <Link
              className="shadow-md shadow-indigo-600 rounded-md desktop:text-4xl font-bold text-3xl p-5 bg-indigo-500  hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 h-[50%]"
              href="/staff/searchcustomer"
            >
              Buscar cliente
            </Link>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PageStaffPanel;
