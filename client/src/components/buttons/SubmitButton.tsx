import React from "react";

const SubmitButton = ({ value }: { value: string }): React.ReactElement => {
  return (
    <button
      type="submit"
      className="font-bold text-white p-2 w-[150px] transition-all ease-in duration-200 tablet:p-2 tablet:w-[40%] tablet:mt-10 tablet:text-xl desktop:w-[250px] bg-[#306a46] hover:bg-[#788b61] rounded-md desktop:p-4 "
    >
      <span className="text-sm desktop:text-xl">{value}</span>
    </button>
  );
};

export default SubmitButton;
