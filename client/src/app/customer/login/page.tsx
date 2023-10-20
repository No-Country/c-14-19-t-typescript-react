import FormLogin from "@/components/user/login/FormLogin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "EasyBank - Login",
};

const Login = (): React.ReactElement => {
  return (
    <div className="bg-slate-100">
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
