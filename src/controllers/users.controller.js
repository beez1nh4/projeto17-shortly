import { connectionDB } from "../database/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function postUsersSignUp(req, res){
    const {name, email, password} = req.body; //confirmPassword
    try{
        const hashPassword = bcrypt.hashSync(password, 12); //create hash

        await connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
        [name, email, hashPassword]
        );
        res.sendStatus(201);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function postUsersSignIn(req, res){
    const {email} = req.body; 
    try{
        const {rows} = await connectionDB.query(
            'SELECT * FROM users WHERE email=$1;',
            [email]
        );
        const userId = rows[0].id
        
        const data = {userId};
		const secretKey = process.env.JWT_SECRET;
		const config = { expiresIn: 60*60*24*30 };
		const token = jwt.sign(data, secretKey, config);

        await connectionDB.query('INSERT INTO sessions ("email", "token", "userId") VALUES ($1, $2, $3);',
        [email, token, userId]
        );
        res.status(200).send(token);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUserInfo(req, res){
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');

    try{
        const sessionExists = await connectionDB.query(
            'SELECT * FROM sessions WHERE token=$1;',
            [token]
          );

        if (rows[0]){
        res.send(rows);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){
    try{
        //left join p n retornar nada se nao houver
        const {rows} = await connectionDB.query("SELECT * FROM customers;");
        res.send(rows);
    } catch (err){
        res.status(500).send(err.message);
    }
}