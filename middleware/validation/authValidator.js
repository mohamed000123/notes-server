import Joi from "joi";

export const authValidator = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20).required(),
  name: Joi.string().min(2).max(20).required(),
});
