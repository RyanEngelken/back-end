//setup .. this is similar to when we use our default tags in html
const express = require('express');
const Song = require('./models/song.js')
//we have to use cors to host front end and backend on same device
var cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require('./models/users.js')
//activate or tell this app varibale to be an express server
const app = express(); 
app.use(cors())
app.use(express.json())
const router = express.Router();
const secret = "supersecret"

//creating a new user
router.post('/users', async (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })

    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)

    }catch(err) {
    }
});

//route to log a user in
//authenticate or login
//post request - reason why is becuase when you login you are creating what we call a new 'session'
router.post('/auth', async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //try to find the username in the database, then see if it matches with a username and password
    //await finding a user
    let user = await User.findOne({username : req.body.username})

    if(!user) {
            res.status(401).json({error: "Bad Username"})
        } 
        //check to see if the users password matches the requests password
        else {
            if(user.password != req.body.password) {
                res.status(401).json({error: "Bad password"})
            }
            //successful login
        else {
            //create a token that is encoded with the jwt library
            //we also will send back as park of the token that you are currently authorized
            //we can do this with a boolean or a number value i.e if auth = 0 you are not auithorized, if auth = 1 you are authorized

            username2 = user.username
            const token = jwt.encode({username: username2}, secret)
            const auth = 1

            //respond with the token
            res.json({
                username2,
                token: token,
                auth: auth
            })
        }
    }
})

//chcek status of user with a valid token, see if it matches the front end token
router.get('/status', async(req,res) =>{
    if(!req.headers["x-auth"]) {
       return res.status(401).json({error: "Missing X-Auth"}) 
    }

    //if x-auth contains the token(it should)
    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token, secret)

        //send back all usernames and status fields to the user or front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "Invalid jwt"})
    }
})


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

router.delete("/songs/:id", async (req, res) => {
    //method or function in mongoose/mongo to delete a single instance of a song or object
    try {
        const song = await Song.findById(req.params.id);
        console.log(song)
    await Song.deleteOne({_id: song._id})
    res.sendStatus(204)
    }
    catch (err){
        res.status(400).send(err)
    }
})

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
//this says before using anything else, use this router first
app.use("/api", router);
app.listen(3000);