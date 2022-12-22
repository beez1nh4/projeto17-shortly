import { nanoid } from 'nanoid'


export async function postUrl(req, res){
    try{
        const {url} = req.body;
        const shortUrl = nanoid(8);
        await connectionDB.query('INSERT INTO urls (shortUrl, url) VALUES ($1, $2);',
        [shortUrl, url]
        );
        const data = {shortUrl};
        res.status(201).send(data);
    } catch (err){
        res.status(500).send(err.message);
    }
}