const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
const salamiDAL = DAL.salamiDAL;
const usersDAL = DAL.usersDAL;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        //TODO: populate DB
        var fname = "Troy";
        var lname = "Koss";
        var email = "troykoss@gmail.com";
        var password = "password";
        return usersDAL.createUser(fname,lname,email,password);  
    }).then((userid) => {
        //res is the response. here it is the ID of troy 
        var timestamp = new Date().toString();
        var side = "over";
        return wagerDAL.createWager(userid, timestamp, side);
    }).then((res) => {
        console.log(res);
        
        console.log("Done seeding database");
    }).then((res) => {
        console.log(res);
        
        console.log("Done seeding database");
    }).then((res) => {
        console.log(res);

        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
