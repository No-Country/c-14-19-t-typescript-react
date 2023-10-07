import { sequelize } from "../../../config/sequelize";
import { BuildOptions, DataTypes, Model } from "sequelize";
import accountModelInterface from "../interface/accountModel.interface";
import UserModel from "../../user/model/user.model";

type AccountTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): accountModelInterface;
};

const AccountModel = sequelize.define("accounts", {
  number_account: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  money: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) as AccountTypeModel;

UserModel.hasMany(AccountModel, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
});
AccountModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
});

export default AccountModel;
