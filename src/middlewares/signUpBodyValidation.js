import { connectionDB } from "../database/db.js";
import { usersSignUpSchema } from "../models/users.model.js";

export async function signUpBodyValidation(req, res, next) {
  const user = req.body;
  const { error } = usersSignUpSchema.validate(user, { abortEarly: false });

  if (error) {
    console.log(error)
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const userExists = await connectionDB.query(
      'SELECT * FROM users WHERE email=$1;',
      [user.email]
  );

  if (userExists.rows[0]) {
      return res
        .status(409)
        .send({ message: "Esse user já existe!" });
    }

  next()
}