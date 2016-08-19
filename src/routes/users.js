const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;

//GET METHODS
//Get all users
router.get("/", (req, res) => { 
    usersDAL.getAllUsers().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by ID
router.get("/id/:id", (req, res) => { 
    usersDAL.getUserByID(req.params.id).then((user) => {
        res.json(user);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by Username/Email
router.get("/:email", (req, res) => { 
    usersDAL.getUserByEmail(req.params.email).then((user) => {
        res.json(user);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/top/leaderboard/", (req, res) => { 
    usersDAL.getTopUsers().then((topUsers) => {
        res.json(topUsers);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by league
router.get("/league/:leagueID", (req, res) => { 
    usersDAL.getUsersByLeague(req.params.leagueID).then((league) => {
        res.json(league);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});
//get league info
router.get("/league/info/:leagueID", (req, res) => { 
    usersDAL.getLeague(req.params.leagueID).then((league) => {
        res.json(league);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.post("/league/create/", (req, res) => { 
    var userId = req.cookies.USER_ID;
    var name = req.body.name
    return usersDAL.createLeague([],name).then((league) => {
        return usersDAL.joinLeague(userId,league);
    }).then((response)=>{
        res.status(200).json(response);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.put("/league/join/", (req, res) => { 
    var userId = req.cookies.USER_ID;
    var leagueId = req.body.leagueId
    usersDAL.joinLeague(userId,leagueId).then((result) => {
        res.json(result);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//POST METHODS
//Create User
router.post("/", (req, res) => {
    var user = req.body;
	var fname = user.fname;
	var lname = user.lname;
	var email = user.email;
	var passwd = user.passwd;

	usersDAL.createUser(fname, lname, email, passwd).catch((e) => {
		res.status(500).json({ error: e });
	});
});

//Join league
router.post("/join", (req, res) => {
	var info = req.body;
	var userID = info.userID;
	var leagueID = info.leagueID;

	usersDAL.joinLeague(userID, leagueID).catch((e) => {
		res.status(500).json({ error: e });
	});
});

//PUT METHODS
//Update
router.put("/:id", (req, res) => {
    var user = req.body;
	var userID = user.id;
	var result = req.body.record;

	usersDAL.updateUser(id, result).catch((e) => {
		res.status(500).json({ error: e });
	});
});

//DELETE METHODS
//Delete
router.delete("/:id", (req, res) => { 
    usersDAL.deleteUser(req.params.id).catch((e) => {
		res.status(500).json({ error: e });
	});
});


module.exports = router;