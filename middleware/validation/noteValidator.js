import Joi from "joi";

export const noteValidator = Joi.object().keys({
  title: Joi.string().min(3).max(20).required(),
  body: Joi.string().min(3).max(300).required(),
  NoteTypeId: Joi.valid(1, 2, 3, 4),
  sender_id: Joi.string().required(),
  receiver_id: Joi.required(),
});
