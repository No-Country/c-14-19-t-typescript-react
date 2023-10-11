import React from "react";
import { nunito } from "@/fonts/fonts";

const LabelsForm = ({ htmlFor }: { htmlFor: string }): React.ReactElement => {
  return (
    <label htmlFor={htmlFor} className={`capitalize mt-5 font-bold ${nunito.className} desktop:text-lg desktop:mt-10`}>
      { htmlFor }
    </label>
  );
};

export default LabelsForm;
