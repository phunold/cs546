const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
var bcrypt = require("bcrypt-nodejs");
const salamiDAL = DAL.salamiDAL;
const usersDAL = DAL.usersDAL;
const wagersDAL = DAL.wagersDAL;
const scoresDAL = DAL.scoresDAL;

var _leagueId = ""
var _leagueMem1 = "";
var _leagueMem2 = "";
var _leagueMem3 = "";
var _leagueMem4 = "";
dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return usersDAL.createLeague([], "The Cool League");
    }).then((leagueId) => {
        _leagueId = leagueId;
        return leagueId;
    }).then((leagueId) => {
        var pw1 = "pass";
        var hash1 = bcrypt.hashSync("pass");
        return usersDAL.createUser("Troy", "Koss", "troykoss@gmail.com", "password");

    }).then((userid) => {
        _leagueMem1 = userid;
        return wagersDAL.createWager(userid, new Date(), "over");
    }).then((res) => {
        var pw2 = "password";
        var hash2 = bcrypt.hashSync(pw2);
        return usersDAL.createUser("Ryan", "Anderson", "ryananderson@gmail.com", "password");
    }).then((userid) => {
        _leagueMem2 = userid;
        return wagersDAL.createWager(userid, new Date(), "under");

    }).then((res) => {
        var pw3 = "password";
        var hash3 = bcrypt.hashSync(pw3);
        return usersDAL.createUser("Brian", "Kelly", "briankelly@gmail.com", "password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, new Date(), "over");

    }).then((res) => {
        var pw4 = "password";
        var hash4 = bcrypt.hashSync(pw4);
        return usersDAL.createUser("Mike", "Smith", "mikesmith@gmail.com", "password");
    }).then((userid) => {
        _leagueMem3 = userid;
        return wagersDAL.createWager(userid, new Date(), "under");

    }).then((res) => {
        var pw5 = "password";
        var hash5 = bcrypt.hashSync(pw5);
        return usersDAL.createUser("Steve", "Leader", "steveleader@gmail.com", "password");
    }).then((userid) => {
        _leagueMem4 = userid;
        return wagersDAL.createWager(userid, new Date(), "over");

    }).then((res) => {
        var pw6 = "password";
        var hash6 = bcrypt.hashSync(pw6);
        return usersDAL.createUser("Christine", "Drucker", "christinedrucker@gmail.com", "password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, new Date(), "under");

    }).then((res) => {
        var pw7 = "password";
        var hash7 = bcrypt.hashSync(pw7);
        return usersDAL.createUser("Helen", "Clark", "helenclark@gmail.com", "password");
    }).then((userid) => {
        return wagersDAL.createWager(userid, new Date(), "over");

    }).then((res) => {
        var date1 = new Date();
        date1.setDate(date1.getDate() - 5);
        return salamiDAL.createSalami(85, 77, "under", "closed", date1);

    }).then((res) => {
        var date2 = new Date();
        date2.setDate(date2.getDate() - 3);
        return salamiDAL.createSalami(65, 66, "over", "closed", date2);

    }).then((res) => {
        var date3 = new Date();
        date3.setDate(date3.getDate() - 1);
        return salamiDAL.createSalami(77, 75, "under", "closed", date3);

    }).then((res) => {
        var date4 = new Date();
        return salamiDAL.createSalami(77, 40, "under", "open", date4);

    }).then((res) => {
        return usersDAL.joinLeague(_leagueMem1, _leagueId);
    }).then((res) => {
        return usersDAL.joinLeague(_leagueMem2, _leagueId);
    }).then((res) => {
        var rec = {
            win: 10,
            loss: 3,
            draw: 0
        }
        return usersDAL.updateRecord(_leagueMem1, rec);
    }).then((res) => {
        rec = {
            win: 4,
            loss: 9,
            draw: 0
        }
        return usersDAL.updateRecord(_leagueMem2, rec);
    }).then((res) => {
        rec = {
            win: 8,
            loss: 2,
            draw: 1
        }
        return usersDAL.updateRecord(_leagueMem3, rec);
    }).then((res) => {
        rec = {
            win: 9,
            loss: 3,
            draw: 1
        }
        return usersDAL.updateRecord(_leagueMem4, rec);
    }).then((res) => {
        scoresArray = [];
        score1 = {
            homeTeam: "Yankees",
            awayTeam: "Red Sox",
            homeScore: 4,
            awayScore: 2
        };
        score2 = {
            homeTeam: "Twins",
            awayTeam: "Royals",
            homeScore: 8,
            awayScore: 1
        };
        score3 = {
            homeTeam: "Mets",
            awayTeam: "Giants",
            homeScore: 7,
            awayScore: 10
        };
        score4 = {
            homeTeam: "Cardinals",
            awayTeam: "Pirates",
            homeScore: 8,
            awayScore: 6
        };
        score5 = {
            homeTeam: "Cubs",
            awayTeam: "Angels",
            homeScore: 6,
            awayScore: 3
        };
        scoresArray.push(score1);
        scoresArray.push(score2);
        scoresArray.push(score3);
        scoresArray.push(score4);
        scoresArray.push(score5);
        return scoresDAL.insertMany(scoresArray);
    }).then((res) => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
