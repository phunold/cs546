const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

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
router.get("/:id", (req, res) => { 
    usersDAL.getUserByID(req.params.id).then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by Username/Email
router.get("/:email", (req, res) => { 
    usersDAL.getUserByEmail(req.params.email).then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/top", (req, res) => { 
    usersDAL.getTopUsers().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by league
router.get("/league/:leagueID", (req, res) => { 
    usersDAL.getUsersByLeague(req.params.leagueID).then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//POST METHODS
//Create User
router.post("/", (req, res) => {
    var user = req.param('user');
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
	var userID = req.param('userID');
	var leagueID = req.param('leagueID');

	usersDAL.joinLeague(userID, leagueID).catch((e) => {
		res.status(500).json({ error: e });
	});
});

//PUT METHODS
//Update
router.put("/:id", (req, res) => {
    var user = req.param('user');
	var userID = user.id;
	var result = req.param('result');

	usersDAL.updateUser(id, updatedUser).catch((e) => {
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