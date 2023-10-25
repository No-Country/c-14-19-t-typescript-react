import FormRegisterStaff from "@/components/staff/register/FormRegisterStaff";
import React from "react";

const RegisterStaff = () => {
  return (
    <div className="h-[100vh] w-screen">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <FormRegisterStaff />
      </div>
    </div>
  );
};

export default RegisterStaff;
