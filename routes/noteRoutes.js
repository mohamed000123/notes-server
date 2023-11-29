import express from "express";
import { mediaUpload } from "../middleware/multer.cjs";
import { validateRequest } from "../utils/joi.js";
import {
  sendNote,
  deleteNote,
  getUserNotes,
  getNoteTypes,
} from "../controllers/noteController.js";
import { noteValidator } from "../middleware/validation/noteValidator.js";
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
