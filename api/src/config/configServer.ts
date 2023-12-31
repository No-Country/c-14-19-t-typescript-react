const configServer = {
  server: {
    port: <number>(<unknown>process.env.PORT) || 3000,
    mode: process.env.MODE,
    jwt_staff_secret: process.env.JWT_STAFF_SECRET,
    jwt_hb_secret: process.env.JWT_HB_SECRET,
    jwt_expiration: process.env.JWT_EXPIRATION,
    jwt_session_secret: process.env.JWT_SESSION_SECRET,
    jwt_session_expiration: process.env.JWT_SESSION_EXPIRATION,
  },
  database: {
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    db: process.env.PG_DB,
    port: process.env.PG_PORT,
  },
  mailer: {
    user: process.env.MAIL_USER,
    host: process.env.MAIL_HOST,
    pass: process.env.MAIL_PASS,
  },
};

export default configServer;
