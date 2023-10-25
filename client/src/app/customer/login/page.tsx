"use client"
import FormLogin from "@/components/user/login/FormLogin";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = (): React.ReactElement => {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('isCustomer') === 'c') router.push('/customer/homebanking');
  }, [])
  
  
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex flex-col w-full h-[90vh] justify-center items-center">
        <h1 className="mt-5 text-3xl font-semibold whitespace-nowrap text-center desktop:text-4xl overflow-y-hidden">
          Login
        </h1>

        <div className="w-[80%] tablet:w-full">
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
