import { Model } from "sequelize";
import { userModelInterface } from "../../user/interface/userModel.interface";

export default interface homebankingModelInterface
  extends Model<homebankingModelInterface> {
  id: string;
  username: string;
  password: string;
  id_user: string;
  user?: userModelInterface;
}
