import { Note } from "../models/note.js";
import { Note_type } from "../models/note_type.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

export const noteValidator = Joi.object().keys({
  title: Joi.string().min(3).max(20).required(),
  body: Joi.string().min(3).max(300).required(),
  NoteTypeId: Joi.valid(1, 2, 3, 4),
  sender_id: Joi.string().required(),
  receiver_id: Joi.required(),
});
export const sendNote = (req, res) => {
  const receivers_no = req.body.receiver_id.length;
  let uploads = req.files ? req.files : [];
  let files = [];
  let records = [];
  if (uploads.length > 0) {
    uploads.forEach((file) => {
      files.push(file.filename);
    });
  }
  for (let i = 0; i < receivers_no; i++) {
    records.push({
      id: uuidv4(),
      title: req.body.title,
      body: req.body.body,
      NoteTypeId: req.body.NoteTypeId,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id[i],
      media_files: files,
    });
  }
  Note.bulkCreate(records)
    .then(() => {
      res.status(200).send("note was sent successfully");
    })
    .catch((e) => {
      res.status(500).send(`sending note error: ${e}`);
    });
};
export const deleteNote = (req, res) => {
  const user_id = req.userId;
  Note.update(
    { is_deleted: true },
    {
      where: {
        [Op.and]: [{ id: req.params.id }, { receiver_id: user_id }],
      },
    }
  )
    .then(() => {
      res.status(200).send(`note was deleted successfully`);
    })
    .catch((error) => {
      res.status(500).send(`deleting note error: ${error}`);
    });
};

export const getUserNotes = (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Date 30 days ago
  const user_id = req.userId;
  const page = req.query.page || 1;
  const pageSize = 7;
  // filtering notes
  const filters = {
    [Op.and]: [
      { is_deleted: false },
      { receiver_id: user_id },
      {
        createdAt: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
    ],
  };
  // Add optional note type filters
  const noteTypeFilters = req.query.type;
  const noteTypeFiltersArray = noteTypeFilters
    ? noteTypeFilters.split(",").map(Number)
    : [];
  if (noteTypeFiltersArray.length > 0) {
    filters["$Note_type.id$"] = {
      [Op.in]: noteTypeFiltersArray,
    };
  }
  Note.findAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where: filters,
    include: [
      {
        model: Note_type,
        where: {
          is_disabled: false,
        },
      },
    ],
  })
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((error) => {
      res.status(500).send(`error retrieving notes: ${error}`);
    });
};
export const getNoteTypes = (req, res) => {
  Note_type.findAll()
    .then((noteTypes) => {
      res.status(200).json(noteTypes);
    })
    .catch((error) => {
      res.status(500).send(`error retrieving notes: ${error}`);
    });
};
