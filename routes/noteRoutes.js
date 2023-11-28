import express from "express";
import { mediaUpload } from "../middleware/multer.cjs";

import {
  sendNote,
  deleteNote,
  getUserNotes,
  getNoteTypes,
} from "../controllers/noteController.js";
const noteRoutes = express.Router();
noteRoutes.post("/send", mediaUpload.array("files"), sendNote);
noteRoutes.delete("/:id", deleteNote);
noteRoutes.get("/user-notes", getUserNotes);
noteRoutes.get("/note-types", getNoteTypes);

export default noteRoutes;
