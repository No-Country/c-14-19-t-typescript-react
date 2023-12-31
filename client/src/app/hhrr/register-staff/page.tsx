import FormRegisterStaff from "@/components/staff/register/FormRegisterStaff";
import React from "react";

const RegisterStaff = () => {
  return (
    <div className="h-full w-screen">
      <div className="flex flex-col justify-center items-center h-full w-full bg-[#e7e7d9]">
        <FormRegisterStaff />
      </div>
    </div>
  );
};

export default RegisterStaff;
