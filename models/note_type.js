import { sequelize } from "./dbConnection.js";
import { Sequelize } from "sequelize";

export const Note_type = sequelize.define(
  "Note_type",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_disabled: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

Note_type.sync();
