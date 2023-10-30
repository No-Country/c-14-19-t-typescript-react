import { AccountsTransferData } from "@/components/transferences/interfaces/transferences.interface";
import { Dispatch, SetStateAction } from "react";

export interface UserAccount {
    jwt: string; 
    hbAccount: { 
        id: string,
        username: string,
        user: {
        id: string,
        name: string,
        lastname: string,
        birthday: string,
        dni: string,
        mail: string,
        cellphone: string
        }
    } 
}

export interface ContextProps {
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
    userInfo: UserAccount;
    setUserInfo: Dispatch<SetStateAction<UserAccount>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    transference: AccountsTransferData;
    setTransference: Dispatch<SetStateAction<AccountsTransferData>>
    exists: boolean;
    setExists: Dispatch<SetStateAction<boolean>>;
  }