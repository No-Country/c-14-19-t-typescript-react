import app from "./app";
import configServer from "./config/configServer";

import { sequelize } from "./config/sequelize";

const PORT = configServer.server.port;

app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  console.log(`Server corriendo en puerto: ${PORT}`);
});
