const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
const salamiDAL = DAL.salamiDAL;
const usersDAL = DAL.usersDAL;
const wagersDAL = DAL.wagersDAL;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
        
    }).then((db) => {
        return usersDAL.createUser("Troy","Koss","troykoss@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Sat Aug 13 2016 11:38:31 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        return usersDAL.createUser("Ryan","Anderson","ryananderson@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        return usersDAL.createUser("Brian","Kelly","briankelly@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        return usersDAL.createUser("Mike","Smith","mikesmith@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Fri Aug 12 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        return usersDAL.createUser("Steve","Leader","steveleader@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Wed Aug 10 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "over");

    }).then((res) => {
        return usersDAL.createUser("Christine","Drucker","christinedrucker@gmail.com","password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, "Mon Aug 08 2016 11:21:56 GMT-0400 (Eastern Standard Time)", "under");

    }).then((res) => {
        return usersDAL.createUser("Helen","Clark","helenclark@gmail.com","password");
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
