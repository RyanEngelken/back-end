//setup .. this is similar to when we use our default tags in html
const express = require('express');
const Song = require('./models/song.js')
//we have to use cors to host front end and backend on same device
var cors = require('cors')
//activate or tell this app varibale to be an express server
const app = express(); 
app.use(cors())
app.use(express.json())
const router = express.Router();

//grab all the songs in a database
router.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find({});
        res.json(songs);
        console.log(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving songs from database');
    }
}
);  

//adds a new song to the database
router.post('/songs', async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.status(201).json(song);
        console.log(song); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving song to database');
    }
});

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
//this says before using anything else, use this router first
app.use("/api", router);
app.listen(3000);