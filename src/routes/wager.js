const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const wagerDAL = DAL.wagerDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

//get last wager
router.get("/:username", (req, res) => { 
    wagerDAL.getCurrentSalami().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//create wager
router.post("/", (req, res) => { 
	var wager = req.param('wagerObj');
	var userID = req.param('userID');
	var timestamp = req.param('timestamp');
	var side = req.param('side');

	usersDAL.createWager(userID, timestamp, side).catch((e) => {
		res.status(500).json({ error: e });
	});
});

module.exports = router;