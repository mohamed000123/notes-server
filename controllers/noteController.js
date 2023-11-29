import { Note } from "../models/note.js";
import { Note_type } from "../models/note_type.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sendNotification } from "../utils/sendNotification.js";
import { User } from "../models/user.js";

const sendNotesnotification = (title, body, receiver_id) => {
  try {
    User.findAll({
      where: {
        id: receiver_id,
      },
      attributes: ["device_token"],
      raw: true,
    })
      .then((tokens) => {
        const tokensArray = tokens.map((token) => {
          return token.device_token;
        });
        sendNotification((title = "you got new note"), title, tokensArray);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};
export const sendNote = (req, res) => {
  try {
    const { title, body, NoteTypeId, sender_id, receiver_id } = req.body;
    const receivers_no = receiver_id.length;
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
        title: title,
        body: body,
        NoteTypeId: NoteTypeId,
        sender_id: sender_id,
        receiver_id: receiver_id[i],
        media_files: files,
      });
    }
    Note.bulkCreate(records)
      .then(() => {
        sendNotesnotification(title, body, receiver_id);
        res.status(200).send("note was sent successfully");
      })
      .catch((e) => {
        res.status(500).send(`sending note error: ${e}`);
      });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};
export const deleteNote = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export const getUserNotes = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};
export const getNoteTypes = (req, res) => {
  try {
    Note_type.findAll()
      .then((noteTypes) => {
        res.status(200).json(noteTypes);
      })
      .catch((error) => {
        res.status(500).send(`error retrieving notes: ${error}`);
      });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};
