import express from "express";
import { mediaUpload } from "../middleware/multer.cjs";

import { sendNote } from "../controllers/noteController.js";
const noteRoutes = express.Router();
noteRoutes.post("/send", mediaUpload.array("files"), sendNote);

export default noteRoutes;
