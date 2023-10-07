import { Model } from "sequelize";
import { userModelInterface } from "../../user/interface/userModel.interface";

export default interface accountModelInterface
  extends Model<accountModelInterface> {
  number_account: string;
  money: number;
  id_user: string;
  user?: userModelInterface;
}
