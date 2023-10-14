import { sequelize } from "../../../config/sequelize";
import { BuildOptions, DataTypes, Model } from "sequelize";
import staffModelInterface from "../interface/staffModel.interface";
import UserModel from "../../user/model/user.model";

type StaffTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): staffModelInterface;
};

const StaffModel = sequelize.define(
  "staffs",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { defaultScope: { attributes: { exclude: ["createdAt", "updatedAt"] } } }
) as StaffTypeModel;

UserModel.hasOne(StaffModel, { foreignKey: "id_user", onDelete: "CASCADE" });
StaffModel.belongsTo(UserModel, { foreignKey: "id_user", onDelete: "CASCADE" });

export default StaffModel;
