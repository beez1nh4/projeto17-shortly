import { connectionDB } from "../database/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function postUsersSignUp(req, res){
    const {name, email, password} = req.body; //confirmPassword
    try{
        const hashPassword = bcrypt.hashSync(user.password, 12); //create hash

        await connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
        [name, email, hashPassword]
        );
        res.sendStatus(201);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function postUsersSignIn(req, res){
    const {email, password} = req.body; 
    try{
        const {rows} = await connectionDB.query(
            'SELECT * FROM users WHERE email=$1;',
            [email]
        );
        const userId = rows[0].id
        const name = rows[0].name

        const data = {userId};
		const secretKey = process.env.JWT_SECRET;
		const config = { expiresIn: 60*60*24*30 };
		const token = jwt.sign(data, secretKey, config);

        await connectionDB.query("INSERT INTO sessions (name, email, password, token) VALUES ($1, $2, $3, $4);",
        [name, email, password, token]
        );
        res.status(200).send(token);
    } catch (err){
        res.status(500).send(err.message);
    }
}