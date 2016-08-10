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
    usersDAL.getUserByID().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by Email
router.get("/:email", (req, res) => { 
    usersDAL.getUserByEmail().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//POST METHODS
//Create User
router.post("/create/user", (req, res) => {
	var fname = req.param('fname');
	var lname = req.param('lname');
	var email = req.param('email');
	var passwd = req.param('passwd');

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

//Create Wager
router.post("/create/wager", (req, res) => {
	var userID = req.param('userID');
	var timestamp = req.param('timestamp');
	var side = req.param('side');

	usersDAL.createWager(userID, timestamp, side).catch((e) => {
		res.status(500).json({ error: e });
	});
});

router.post("/update", (req, res) => {
	var userID = req.param('userID');
	var result = req.param('result');

	usersDAL.updateRecord(uesrID, result).catch((e) => {
		res.status(500).json({ error: e });
	});
});

//PUT METHODS
//
// router.put("/:id", (req, res) => {
   

// });

//DELETE METHODS
//
// router.delete("/:id", (req, res) => {
    
// });

module.exports = router;