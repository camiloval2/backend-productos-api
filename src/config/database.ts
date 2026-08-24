import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

// Inicializamos la conexión directa y segura a Render
export const sequelize = new Sequelize({
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
