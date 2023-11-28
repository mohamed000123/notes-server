import express from "express";
import { imageUpload } from "../middleware/multer.cjs";

import { login, signup, logout } from "../controllers/authController.js";
const authRoutes = express.Router();
authRoutes.post("/login", login);
authRoutes.post("/signup", imageUpload.array("files"), signup);
authRoutes.get("/logout", logout);

export default authRoutes;
