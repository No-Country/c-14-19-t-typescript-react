"use client";
import FormLoginStaff from "@/components/staff/login/FormLoginStaff";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Staff = () => {
  const router = useRouter();

  useEffect(() => {
    const getAuth = sessionStorage.getItem("authorized");
    const getDepartment = sessionStorage.getItem("zxcvbn");
    if (getAuth && getDepartment === "a") router.push("/staff/staffpanel");
    if (getAuth && getDepartment === "h") router.push("/hhrr/hhrrpanel");
    if (sessionStorage.getItem("isCustomer") === "c")
      router.push("/customer/homebanking");
    else return;
  }, []);

  return (
    <div className="w-screen h-[90vh]">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="mt-5 text-xl font-semibold whitespace-nowrap text-center desktop:text-4xl overflow-y-hidden">
          Login <span className="text-[#FF5722]">Staff Members</span>
        </h1>
        <FormLoginStaff />
      </div>
    </div>
  );
};

export default Staff;
