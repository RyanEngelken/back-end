//setup .. this is similar to when we use our default tags in html
const express = require('express');
//we have to use cors to host front end and backend on same device
var cors = require('cors')
//activate or tell this app varibale to be an express server
const app = express(); 
app.use(cors())
const router = express.Router(); 



//making an api using routes
//routes are used to handle browswer requests. The look like urls, the difference is that when a browswer request a route it is dynamically handled by using a function. 

router.get("/songs", function(req, res) {
    const songs = [ 
        {
        title: "We Found Love",
        artist: "Rihanna",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["electro house"]
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["soul", "new soul"]
    } ]
    //this is transforming the song object into a json string and sending it to the client
    res.json(songs)
});

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
//this says before using anything else, use this router first
app.use("/api", router);
app.listen(3000);