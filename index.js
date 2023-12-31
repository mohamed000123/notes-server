import express from "express";
import { sequelize } from "./models/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authCheck from "./middleware/auth.js";
import { Note } from "./models/note.js";
import { Note_type } from "./models/note_type.js";
import { User } from "./models/user.js";
const app = express();
sequelize
  .authenticate()
  .then(() => {
    app.listen("8000", () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((e) => {
    console.log("error connecting to db", e);
  });

// middelwares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.use("/", authRoutes);
app.use("/note", authCheck, noteRoutes);
