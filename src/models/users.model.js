import joi from "joi";

export const usersSignUpSchema = joi.object({
  name: joi.string().required().min(3).max(50),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirmation: joi.string().required().valid(joi.ref('password')),
});

export const usersSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});