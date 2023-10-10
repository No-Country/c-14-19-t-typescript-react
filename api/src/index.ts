import app from "./app";
import configServer from "./config/configServer";

import { sequelize } from "./config/sequelize";

const main = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false, alter: true });
    
    const PORT: number = configServer.server.port;
    app.listen(PORT, "0.0.0.0", () => console.log(`Server corriendo en puerto: ${PORT}`));
  } catch (error) {
    console.log('Unable to connect to the database')
  }
}

main()