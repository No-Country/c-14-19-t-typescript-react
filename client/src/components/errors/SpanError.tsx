import React from "react";
import { ErrorMessage } from "formik";

const SpanError = ({ prop }: { prop: string }): React.ReactElement => {
  return (
    <span className="text-[#FF5722] text-[11px] w-[200px] tablet:text-[12px] desktop:w-full desktop:text-sm mt-1 overflow-y-hidden tablet:w-full ">
      <ErrorMessage name={prop} />
    </span>
  );
};

export default SpanError;
