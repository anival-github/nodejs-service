export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  env: process.env.NODE_ENV || 'development',
  jwtKey: process.env.JWT_SECRET_KEY,
  loggerLevel: parseInt(process.env.LOGGER_LEVEL, 10) || 4,
  pgPass: process.env.POSTGRES_PASSWORD,
  pgUser: process.env.POSTGRES_USER,
  pgDB: process.env.POSTGRES_DB,
  pgData: process.env.PGDATA,
  pgHost: process.env.POSTGRES_HOST,
  pgPort: parseInt(process.env.POSTGRES_PORT, 10) || 5433,
  dbType: process.env.DB_TYPE,
});
