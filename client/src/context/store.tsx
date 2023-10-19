"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ContextProps {
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  submitButtonValue: string;
  setSubmitButtonValue: Dispatch<SetStateAction<string>>;
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  isAuthorized: boolean;
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

type ChildrenProp = {
  children: ReactNode;
};

export const GlobalContext = createContext<ContextProps>({
  errorMessage: "",
  setErrorMessage: (): string => "",
  submitButtonValue: "",
  setSubmitButtonValue: (): string => "",
  isClicked: false,
  setIsClicked: (): boolean => false,
  isAuthorized: false,
  setIsAuthorized: (): boolean => false,
  username: "",
  setUsername: (): string => "",
});

export const GlobalContextProvider = ({ children }: ChildrenProp) => {
  // ---- FORMS ---- //
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitButtonValue, setSubmitButtonValue] = useState<string>("Login");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  // ---- AUTH ---- //
  const [username, setUsername] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        errorMessage,
        submitButtonValue,
        isClicked,
        isAuthorized,
        username,
        setErrorMessage,
        setSubmitButtonValue,
        setIsClicked,
        setIsAuthorized,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
