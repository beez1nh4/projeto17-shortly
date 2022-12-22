import { urlsSchema } from "../models/urls.model.js";

export async function urlBodyValidation(req, res, next) {
  const url = req.body;
  const { error } = urlsSchema.validate(url, { abortEarly: false });

  if (error) {
    console.log(error)
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next()
}