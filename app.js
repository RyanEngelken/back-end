//setup .. this is similar to when we use our default tags in html
const express = require('express');
//activate or tell this app varibale to be an express server
const app = express(); // create an instance of express


//star the web server ..  app.listen(portnumber, function)
app.listen(3000, function() {
    console.log("Listening on port 3000")
});

//making an api using routes
//routes are used to handle browswer requests. The look like urls, the difference is that when a browswer request a route it is dynamically handled by using a function. 


//Get or a regular request when someone goes to http://localhost:3000/hello
//local development is localhost:3000, but when you deploy it to a server it will be the server address
//when using a function in a route we almost always have a paramater or handle a response and request
app.get('/hello', function(req, res) {
    res.send("<h1>Hello Express</h1>");
});

app.get('/goodbye', function(req, res) {
    res.send("<h1>Goodbye, Express!</h1>");
});
