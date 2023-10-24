import accountInterface from "../../bankingAccount/interface/account.interface";

export default interface transferenceInterface {
  id: string;
  sender_account?: accountInterface;
  receiver_account?: accountInterface;
  amount: number;
  date: string;
}
