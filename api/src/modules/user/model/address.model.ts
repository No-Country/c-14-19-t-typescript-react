import { sequelize } from "../../../config/sequelize";
import { BuildOptions, DataTypes, Model } from "sequelize";
import { addressModelInterface } from "../interface/addressModel.interface";

type AddressTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): addressModelInterface;
};

const AddressModel = sequelize.define("addresses", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postal_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) as AddressTypeModel;

export default AddressModel;
