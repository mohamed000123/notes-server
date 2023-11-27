import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
export const sequelize = new Sequelize(
  "guest_note",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    logging: false, // Disable SQL logs
  }
);
