import { Model } from "sequelize";

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
}
