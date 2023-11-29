import express from "express";
import { imageUpload } from "../middleware/multer.cjs";
import { validateRequest } from "../utils/joi.js";
import { login, signup, logout } from "../controllers/authController.js";
import { authValidator } from "../middleware/validation/authValidator.js";
const authRoutes = express.Router();
authRoutes.post("/login", login);
authRoutes.post(
  "/signup",
  validateRequest(authValidator, "body"),
  imageUpload.array("files"),
  signup
);
authRoutes.get("/logout", logout);

export default authRoutes;
