import { sequelize } from "../../../config/sequelize";
import { Model, BuildOptions, DataTypes } from "sequelize";
import homebankingModelInterface from "../interface/homebankingModel.interface";
import UserModel from "../../user/model/user.model";

type homeBankingTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): homebankingModelInterface;
};

const HomebankingModel = sequelize.define("homebanking_accounts", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) as homeBankingTypeModel;

UserModel.hasOne(HomebankingModel, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
});
HomebankingModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
});

export default HomebankingModel;
