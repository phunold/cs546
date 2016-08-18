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

app.use("/api*",function(request,response,next){
    //check if the user has a sessionid
    var userId = request.cookies.USER_ID;
    usersDAL.getUserByID(userId).then(function(user){
        var sessionId = request.cookies.SESSION_ID;
        var sessionArray = user.sessions;
        if(sessionArray.indexOf(sessionId) == -1){
            response.status(401).send("Unauthorized Access Attempt. Session invalid");
        }else{
            next();
	    console.log("Success");
        }
    },function(error){
        response.status(500).send("Unauthorized Access Attempt. Session invalid");
    });
});

app.use("/logout", function(request, response, next){
    authData.terminateSession(request.cookies.SESSION_ID, request.cookies.USER_ID).then(function(){
        //TODO: expire the USER_ID and SESSION_ID cookies
	response.clearCookie("SESSION_ID");
	response.clearCookie("USER_ID");
    },function(error){
        //error wiping the session data from the users prof
    response.clearCookie("SESSION_ID");
	response.clearCookie("USER_ID");
        //TODO: expire the USER_ID and SESSION_ID cookies
    })

});


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
