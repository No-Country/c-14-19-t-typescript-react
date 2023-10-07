import { Model } from "sequelize";
import { userModelInterface } from "../../user/interface/userModel.interface";

export default interface staffModelInterface
  extends Model<staffModelInterface> {
  id: string;
  id_user: string;
  username: string;
  password: string;
  department: string;
  user?: userModelInterface;
}
