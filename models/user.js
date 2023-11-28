import { sequelize } from "./dbConnection.js";
import { Sequelize } from "sequelize";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw new Error("Password should be at least 8 characters long");
          }
        },
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    profile_picture: {
      type: Sequelize.STRING,
      defaultValue: "https://i.stack.imgur.com/l60Hf.png",
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

User.sync();
