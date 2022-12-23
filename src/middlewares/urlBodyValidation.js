import { connectionDB } from "../database/db.js";
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

export async function urlExistanceValidation(req, res, next) {
    const {id} = req.params;
  
    const urlExists = await connectionDB.query(
        'SELECT * FROM urls WHERE id=$1;',
        [id]
    );
  
    if (!urlExists.rows[0]) {
        return res
          .status(404)
          .send({ message: "Essa url não existe!" });
      }
  
    next()
  }
export async function urlExistanceValidation2(req, res, next) {
    const {shorturl} = req.params;
  
    const urlExists = await connectionDB.query(
    'SELECT * FROM urls WHERE "shortUrl"=$1;',
    [shorturl]
    );
  
    if (!urlExists.rows[0]) {
        return res
            .status(404)
            .send({ message: "Essa url não existe!" });
    }
  
    next()
}