const configServer = {
  server: {
    port: process.env.PORT || 5000,
    mode: process.env.MODE,
    jwt_staff_secret: process.env.JWT_STAFF_SECRET,
    jwt_hb_secret: process.env.JWT_HB_SECRET,
    jwt_expiration: process.env.JWT_EXPIRATION,
  },
  database: {
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    db: process.env.PG_DB,
    port: process.env.PG_PORT,
  },
};

export default configServer;
