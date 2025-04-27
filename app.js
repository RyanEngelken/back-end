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
    } catch (err) {
        console.error(err);
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
    } catch (err) {
        console.error(err);
    }
});

//grab a single song in the list
router.get('/songs/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        res.json(song);
    } catch(err) {
        res.status(400).send(err)
    }
});


//update is to update an existing record/resource/database entry.. it just uses a put request
router.put("/songs/:id", async (req, res) => {
    //first we need to find and uupdate the song the front end wants up to update
    //we need to request the id of the song from the reueset and find it in the database and update it
    try {
        const song = req.body; //this is the new song object that we want to update to
        await Song.updateOne ({_id: req.params.id},song)
        res.sendStatus(204)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
//this says before using anything else, use this router first
app.use("/api", router);
app.listen(3000);