import FormRegister from "@/components/user/register/FormRegister";
import { nunito } from "@/fonts/fonts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "EasyBank - Register",
};

const Register = (): React.ReactElement => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col justify-center items-center gap-10 h-screen w-screen">
        <h1 className={`text-2xl font-semibold ${nunito.className} tablet:text-3xl desktop:text-4xl`}>Register a new account.</h1>
        <div className="w-[80%]">
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
