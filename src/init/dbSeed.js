const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
const salamiDAL = DAL.salamiDAL;
const usersDAL = DAL.usersDAL;
const wagersDAL = DAL.wagersDAL;   //need to confirm 

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return usersDAL.createUser("Troy","Koss","troykoss@gmail.com","password");
    }).then((userid) => {
        //var timestamp = new Date().toString();
        return wagersDAL.createWager(userid, "Sat Aug 13 2016 11:38:31 GMT-0400 (Eastern Standard Time)", "over");
    }).then((res) => {
        return usersDAL.createUser("Ryan","Anderson","ryananderson@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        var timestamp = new Date().toString();
        return wagersDAL.createWager(userid, timestamp, "over");
    }).then((res) => {
        return usersDAL.createUser("Brian","Kelly","briankelly@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        var timestamp1 = new Date().toString();
        return wagersDAL.createWager(userid, timestamp1, "under");
    }).then((res) => {
        return usersDAL.createUser("Mike","Smith","mikesmith@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        var timestamp2 = new Date().toString();
        return wagersDAL.createWager(userid, timestamp2, "over");
    }).then((res) => {
        return usersDAL.createUser("Steve","Leader","steveleader@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        var timestamp3 = new Date().toString();
        return wagersDAL.createWager(userid, timestamp3, "over");
    }).then((res) => {
        return usersDAL.createUser("Christine","Drucker","christinedrucker@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        var timestamp4 = new Date().toString();
        return wagersDAL.createWager(userid, timestamp4, "over");
    }).then((res) => {
        return usersDAL.createUser("Helen","Clark","helenclark@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");
    }).then((userid) => {
        var timestamp5 = new Date().toString();
        return wagersDAL.createWager(userid, timestamp5, "over");
    }).then((res) => {
        return salamiDAL.createSalami(85,77,"under","closed");
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
