const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");

app.use(bodyParser.json());
// application -------------------------------------------------------------
// https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
    //res.sendFile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
