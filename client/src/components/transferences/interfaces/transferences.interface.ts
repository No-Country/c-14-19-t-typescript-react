export interface UserAccounts {
  id_user: string;
  money: string;
  number_account: string;
}

export interface TransferBetweenAccountsFields {
  from: string;
  to: string;
  amount: string;
}

export interface AccountsTransferData {
  sender_number_account: string;
  receiver_number_account: string;
  amount: number;
}

export type UserAccountsError = Record<string, string>;
