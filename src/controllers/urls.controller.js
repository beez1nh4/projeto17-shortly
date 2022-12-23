import { nanoid } from 'nanoid'
import { connectionDB } from '../database/db.js';

export async function postUrl(req, res){
    try{
        const { authorization } = req.headers;
        const token = authorization.replace('Bearer ', '');

        const sessionExists = await connectionDB.query(
            'SELECT * FROM sessions WHERE token=$1;',
            [token]
        );
        
        const {userId} = sessionExists.rows[0];

        const {url} = req.body;
        const shortUrl = nanoid(8);
        await connectionDB.query('INSERT INTO urls ("shortUrl", "url", "visitCount", "userId") VALUES ($1, $2, $3, $4);',
        [shortUrl, url, 0, userId]
        );
        const data = {shortUrl};
        res.status(201).send(data);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res){
    const {id} = req.params;
    try{
        const {rows} = await connectionDB.query(
            'SELECT id, "shortUrl", "url" FROM urls WHERE id=$1;',
            [id]
        );

        res.status(200).send(rows);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res){
    const {shorturl} = req.params;
    try{
        const {rows} = await connectionDB.query(
            'SELECT * FROM urls WHERE "shortUrl"=$1;',
            [shorturl]
        );
        const newNumber = rows[0].visitCount+1
        await connectionDB.query('UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;',
        [newNumber, shorturl],
        );

        const url = rows[0].url
        res.redirect(url);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params;
    try{
        const urlExists = await connectionDB.query(
            'SELECT * FROM urls WHERE id=$1;',
            [id]
        );

        if (urlExists.rows[0].userId = id){
    
        await connectionDB.query("DELETE FROM urls WHERE id=$1;", [id]);
        res.sendStatus(204);
        } else{
            return res
            .status(422)
            .send({ message: "Essa url não é sua!" });
        }
    } catch (err){
        res.status(500).send(err.message);
    }
}