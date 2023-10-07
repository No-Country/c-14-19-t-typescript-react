import { Model } from "sequelize";

export interface addressModelInterface extends Model<addressModelInterface> {
  id: string;
  street: string;
  number: number;
  postal_code: number;
  city: string;
  id_user: string;
}
