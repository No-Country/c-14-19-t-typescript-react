import React from "react";
import { ErrorMessage } from "formik";

const SpanError = ({ prop }: { prop: string }): React.ReactElement => {
  return (
    <span className="text-red-500 text-xs mt-1">
      <ErrorMessage name={prop} />
    </span>
  );
};

export default SpanError;
