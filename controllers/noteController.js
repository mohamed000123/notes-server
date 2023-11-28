import { Note } from "../models/note.js";
import { v4 as uuidv4 } from "uuid";
export const sendNote = (req, res) => {
  const receivers_no = req.body.receiver_id.length;
  let records = [];
  for (let i = 0; i < receivers_no; i++) {
    records.push({
      id: uuidv4(),
      title: req.body.title,
      body: req.body.body,
      NoteTypeId: req.body.NoteTypeId,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id[i],
    });
  }
  Note.bulkCreate(records);
  res.send("note sent successfully");
};
