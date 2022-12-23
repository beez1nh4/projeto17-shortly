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
        const userInfo = await connectionDB.query(
            'SELECT users.id AS "id", name, SUM("visitCount") AS "visitCount" FROM sessions JOIN users ON sessions."userId" = users.id JOIN urls ON urls."userId" = users.id WHERE token=$1 GROUP BY users.id;',
            [token]
          );
        const urlsInfo = await connectionDB.query(
            'SELECT urls.id AS "id", "shortUrl", "url", "visitCount" FROM urls JOIN sessions ON sessions."userId" = urls."userId" WHERE token=$1 ORDER BY "visitCount" DESC;',
            [token]
          );
        const completeUserInfo = {
            id: userInfo.rows[0].id,
            name: userInfo.rows[0].name,
            visitCount: userInfo.rows[0].visitCount,
            shortenedUrls: urlsInfo.rows
        }
        res.send(completeUserInfo);
        
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await connectionDB.query(`SELECT 
            users.id as "id",
            users.name as "name",
            COUNT("userId") as "linksCount",
            COALESCE(SUM("visitCount"),0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`);
        res.send(ranking.rows);
    } catch (err){
        res.status(500).send(err.message);
    }
}