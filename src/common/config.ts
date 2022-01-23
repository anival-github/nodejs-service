import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || 4000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'key',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || '4',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PGDATA: process.env.PGDATA,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5433,
  DB_TYPE: process.env.DB_TYPE || "postgres",
};

export default config;

