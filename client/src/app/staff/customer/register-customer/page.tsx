import FormRegister from "@/components/user/register/FormRegister";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "EasyBank - Register",
};

const Register = (): React.ReactElement => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col justify-center items-center gap-10 h-[90vh] w-screen">
        <div className="w-[80%] tablet:w-full overflow-y-hidden">
          <h1 className="mt-5 text-xl font-semibold whitespace-nowrap tablet:text-3xl text-center desktop:text-4xl overflow-y-hidden">
            Register a new account.
          </h1>
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
