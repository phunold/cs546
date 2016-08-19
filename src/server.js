const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
let app = express();
let configRoutes = require("./routes");
var path = require('path');

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(cookieParser());
const DAL = require("./DAL");
const usersDAL = DAL.usersDAL;
const Data = require("./data");
const authData = Data.authData;
//Middlewares:

app.use("/api*", function (request, response, next) {
    //check if the user has a sessionid
    var userId = request.cookies.USER_ID;
    var sessionId = request.cookies.SESSION_ID;
    if (userId && sessionId) {
        next();
    } else {
        response.status(401).send("Unauthorized Access Attempt. Session invalid");
    }
});

app.use("/logout", function (request, response, next) {
    authData.terminateSession(request.cookies.SESSION_ID, request.cookies.USER_ID).then(function () {
        var anHourAgo = new Date();
        anHourAgo.setHours(anHourAgo.getHours() - 1);

        response.cookie("SESSION_ID", "", { expires: anHourAgo });
        response.cookie("USER_ID", "", { expires: anHourAgo });
        response.clearCookie("SESSION_ID");
        response.clearCookie("USER_ID");

        response.status(200);
    }, function (error) {
        //error wiping the session data from the users prof
        response.clearCookie("SESSION_ID");
        response.clearCookie("USER_ID");
        //TODO: expire the USER_ID and SESSION_ID cookies
    })

});

configRoutes(app);

// application -------------------------------------------------------------
// https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
    //res.sendFile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});




app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
