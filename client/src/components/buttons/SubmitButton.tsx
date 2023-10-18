import React from "react";

const SubmitButton = ({ value }: { value: string }): React.ReactElement => {
  return (
    <button
      type="submit"
      className="mt-5 font-bold p-1 bg-indigo-500 rounded w-[50%] hover:bg-indigo-600 transition-all ease-in duration-200 tablet:p-2 tablet:w-[40%] tablet:mt-10 tablet:text-xl desktop:w-[300px] desktop:p-3"
    >
      {value}
    </button>
  );
};

export default SubmitButton;
