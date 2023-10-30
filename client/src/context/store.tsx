"use client";
import React, { ReactNode, createContext, useState } from "react";
import { ContextProps, UserAccount } from "./interfaces/store.interfaces";
import { AccountsTransferData } from "@/components/transferences/interfaces/transferences.interface";

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

const transferSuccesfully: AccountsTransferData = {
  sender_number_account: '',
  receiver_number_account: '',
  amount: 0
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
  setUserInfo: ():UserAccount => userInfoValues,
  isLoading: false,
  setIsLoading: ():boolean => false,
  transference: transferSuccesfully,
  setTransference: (): AccountsTransferData => transferSuccesfully,
  exists: true,
  setExists: ():boolean => true
});

export const GlobalContextProvider = ({ children }: ChildrenProp) => {
  // ---- FORMS ---- //
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitButtonValue, setSubmitButtonValue] = useState<string>("Login");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [exists, setExists] = useState(true);

  // ---- AUTH ---- //
  const [username, setUsername] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserAccount>(userInfoValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ---- TRANSFER ---- //
  const [transference, setTransference] = useState<AccountsTransferData>(transferSuccesfully);

  return (
    <GlobalContext.Provider
      value={{
        errorMessage,
        submitButtonValue,
        isClicked,
        isAuthorized,
        username,
        userInfo,
        isLoading,
        transference,
        exists,
        setErrorMessage,
        setSubmitButtonValue,
        setIsClicked,
        setIsAuthorized,
        setUsername,
        setUserInfo,
        setIsLoading,
        setTransference,
        setExists
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
