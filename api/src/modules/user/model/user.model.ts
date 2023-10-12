import { sequelize } from "../../../config/sequelize";
import { BuildOptions, DataTypes, Model } from "sequelize";
import { userModelInterface } from "../interface/userModel.interface";

type UserTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): userModelInterface;
};

const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cellphone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    reference_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { defaultScope: { attributes: { exclude: ["createdAt", "updatedAt"] } } }
) as UserTypeModel;

export default UserModel;
