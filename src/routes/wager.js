const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const wagerDAL = DAL.wagerDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

//get last wager
router.get("/:username", (req, res) => { 
	var email = req.params.username;
    wagerDAL.getLastWagerByEmail().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//create wager
router.post("/", (req, res) => { 
	var wager = req.body;
	var userID = wager.userID;
	var timestamp = wager.timestamp;
	var side = wager.wager;

	usersDAL.createWager(userID, timestamp, side).catch((e) => {
		res.status(500).json({ error: e });
	});
});

module.exports = router;