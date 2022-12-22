import { connectionDB } from "../database/db.js";
//import joi from "joi";
//{ Authorization: `Bearer ${token}` }


export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  const sessionExists = await connectionDB.query(
      'SELECT * FROM sessions WHERE token=$1;',
      [token]
  );

  if (!sessionExists.rows[0]) {
      return res
        .status(401)
        .send({ message: "Essa sessão não existe!" });
    }

  next()
}