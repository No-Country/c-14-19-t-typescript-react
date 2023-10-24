"use client";
import React, { ReactNode, createContext, useState } from "react";
import { ContextProps, UserAccount } from "./interfaces/store.interfaces";

const userInfoValues = {
    jwt: '',
    hbAccount: { 
        id: '',
        username: '',
        user: {
        id: '',
        name: '',
        lastname: '',
        birthday: '',
        dni: '',
        mail: '',
        cellphone: ''
        }
    } 
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
  userInfo: userInfoValues,
  setUserInfo: ():UserAccount => userInfoValues
});

export const GlobalContextProvider = ({ children }: ChildrenProp) => {
  // ---- FORMS ---- //
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitButtonValue, setSubmitButtonValue] = useState<string>("Login");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // ---- AUTH ---- //
  const [username, setUsername] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserAccount>(userInfoValues);

  return (
    <GlobalContext.Provider
      value={{
        errorMessage,
        submitButtonValue,
        isClicked,
        isAuthorized,
        username,
        userInfo,
        setErrorMessage,
        setSubmitButtonValue,
        setIsClicked,
        setIsAuthorized,
        setUsername,
        setUserInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
