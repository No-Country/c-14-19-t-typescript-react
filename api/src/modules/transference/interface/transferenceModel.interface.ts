import { Model } from "sequelize";
import accountModelInterface from "../../bankingAccount/interface/accountModel.interface";

export default interface transferenceModelInterface
  extends Model<transferenceModelInterface> {
  id: string;
  sender_number_account: string;
  receiver_number_account: string;
  amount: number;
  date: string;
  sender_account?: accountModelInterface;
  receiver_account?: accountModelInterface;
}
