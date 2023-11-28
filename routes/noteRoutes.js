import express from "express";
import { mediaUpload } from "../middleware/multer.cjs";
import { validateRequest } from "../utils/joi.js";

import {
  sendNote,
  deleteNote,
  getUserNotes,
  getNoteTypes,
  noteValidator,
} from "../controllers/noteController.js";
const noteRoutes = express.Router();
noteRoutes.post(
  "/send",
  validateRequest(noteValidator, "body"),
  mediaUpload.array("files"),
  sendNote
);
noteRoutes.delete("/:id", deleteNote);
noteRoutes.get("/user-notes", getUserNotes);
noteRoutes.get("/note-types", getNoteTypes);

export default noteRoutes;
