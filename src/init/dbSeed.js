const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
var bcrypt = require("bcrypt-nodejs");
const salamiDAL = DAL.salamiDAL;
const usersDAL = DAL.usersDAL;
const wagersDAL = DAL.wagersDAL;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
        
    }).then((db) => {
        var pw1 = "pass";
        var hash1 = bcrypt.hashSync("pass");
        return usersDAL.createUser("Troy","Koss","troykoss@gmail.com",hash1);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Sat Aug 13 2016 11:38:31 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        var pw2 = "password";
        var hash2 = bcrypt.hashSync(pw2);
        return usersDAL.createUser("Ryan","Anderson","ryananderson@gmail.com",hash2);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        var pw3 = "password";
        var hash3 = bcrypt.hashSync(pw3);
        return usersDAL.createUser("Brian","Kelly","briankelly@gmail.com",hash3);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        var pw4 = "password";
        var hash4 = bcrypt.hashSync(pw4);
        return usersDAL.createUser("Mike","Smith","mikesmith@gmail.com",hash4);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        var pw5 = "password";
        var hash5 = bcrypt.hashSync(pw5);
        return usersDAL.createUser("Steve","Leader","steveleader@gmail.com",hash5);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        var pw6 = "password";
        var hash6 = bcrypt.hashSync(pw6);
        return usersDAL.createUser("Christine","Drucker","christinedrucker@gmail.com",hash6);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        var pw7 = "password";
        var hash7 = bcrypt.hashSync(pw7);
        return usersDAL.createUser("Helen","Clark","helenclark@gmail.com",hash7);
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        var date1 = new Date();
        date1.setDate(date1.getDate()-5);
        return salamiDAL.createSalami(85,77,"under","closed",date1);
        
    }).then((res) => {
        var date2 = new Date();
        date2.setDate(date2.getDate()-3);
        return salamiDAL.createSalami(65,66,"over","closed",date2);
        
    }).then((res) => {
        var date3 = new Date();
        date3.setDate(date3.getDate()-1);
        return salamiDAL.createSalami(77,75,"under","closed",date3);
        
    }).then(() => {
        //console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
