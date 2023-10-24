import React from "react";

const SubmitButton = ({ value }: { value: string }): React.ReactElement => {
  return (
    <button
      type="submit"
      className="mt-5 font-bold p-1  transition-all ease-in duration-200 tablet:p-2 tablet:w-[40%] tablet:mt-10 tablet:text-xl desktop:w-[300px] desktop:p-3 eb-button "
    >
      <span className="text-sm desktop:text-xl">{value}</span>
    </button>
  );
};

export default SubmitButton;
