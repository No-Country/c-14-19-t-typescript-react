import React from "react";
import { nunito } from "@/fonts/fonts";

const LabelsForm = ({ htmlFor }: { htmlFor: string }): React.ReactElement => {
  return (
    <label htmlFor={htmlFor} className={`capitalize font-bold ${nunito.className} desktop:text-lg desktop:mt-10 overflow-hidden`}>
      { htmlFor }
    </label>
  );
};

export default LabelsForm;
