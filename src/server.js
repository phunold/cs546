const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");
var path = require('path');

app.use(express.static(__dirname + '/app')); 

app.use(bodyParser.json());
// application -------------------------------------------------------------
// https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
    //res.sendFile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
