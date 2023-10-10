import configServer from "./configServer";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  configServer.database.db,
  configServer.database.username,
  configServer.database.password,
  {
    host: configServer.database.host,
    dialect: "postgres",
    dialectOptions: { ssl: true, native: true },
    logging: false,
    port: parseInt(configServer.database.port),
  }
);