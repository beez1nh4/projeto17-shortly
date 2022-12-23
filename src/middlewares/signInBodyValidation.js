import { connectionDB } from "../database/db.js";
import { usersSchema } from "../models/users.model.js";
import bcrypt from "bcrypt";

export async function signInBodyValidation(req, res, next) {
  const user = req.body;
  const {email, password} = req.body;
  const { error } = usersSchema.validate(user, { abortEarly: false });

  if (error) {
    console.log(error)
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

const userExists = await connectionDB.query(
    'SELECT * FROM users WHERE email=$1;',
    [email]
);

if (!userExists.rows[0]) {
    return res
      .status(401)
      .send({ message: "Esse user não existe!" });
  } else{
  const rightPassword = bcrypt.compareSync(password, userExists.rows[0].password);
  if (!rightPassword) {
    return res.status(401).send({message: "Senha incorreta!"});
  }
}
next()
}