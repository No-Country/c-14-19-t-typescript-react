import React from "react";
import { nunito } from "@/fonts/fonts";

const LabelsForm = ({ htmlFor }: { htmlFor: string }): React.ReactElement => {
  return (
    <label htmlFor={htmlFor} className={`w-[78%] tablet:w-full mt-5 capitalize font-bold ${nunito.className} desktop:text-lg desktop:mt-8 overflow-hidden`}>
      { htmlFor }
    </label>
  );
};

export default LabelsForm;
