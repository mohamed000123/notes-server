import { sequelize } from "./dbConnection.js";
import { Sequelize } from "sequelize";
import { Note_type } from "./note_type.js";
import { User } from "./user.js";
export const Note = sequelize.define(
  "Note",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    media_files: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Note.belongsTo(Note_type);
Note.belongsTo(User, {
  foreignKey: "sender_id",
});
Note.belongsTo(User, {
  foreignKey: "receiver_id",
});
Note.sync();
