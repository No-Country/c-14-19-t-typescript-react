import { sequelize } from "../../../config/sequelize";
import { BuildOptions, DataTypes, Model } from "sequelize";
import transferenceModelInterface from "../interface/transferenceModel.interface";
import AccountModel from "../../bankingAccount/model/account.model";

type TransferenceTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): transferenceModelInterface;
};

const TransferenceModel = sequelize.define("transferences", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  sender_number_account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiver_number_account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}) as TransferenceTypeModel;

AccountModel.hasMany(TransferenceModel, {
  foreignKey: "sender_number_account",
  as: "sender_account",
});
TransferenceModel.belongsTo(AccountModel, {
  foreignKey: "sender_number_account",
  as: "sender_account",
});

AccountModel.hasMany(TransferenceModel, {
  foreignKey: "receiver_number_account",
  as: "receiver_account",
});
TransferenceModel.belongsTo(AccountModel, {
  foreignKey: "receiver_number_account",
  as: "receiver_account",
});

export default TransferenceModel;
