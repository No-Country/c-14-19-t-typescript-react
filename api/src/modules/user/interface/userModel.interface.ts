import { Model } from "sequelize";
import { addressModelInterface } from "./addressModel.interface";

export interface userModelInterface extends Model<userModelInterface> {
  id: string;
  name: string;
  lastname: string;
  birthday: string;
  dni: number;
  mail: string;
  cellphone: number;
  reference_code: string;
  role: string;
  address?: addressModelInterface;
}
