const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const wagersDAL = DAL.wagersDAL;

//get last wager
router.get("/:username", (req, res) => {
	var email = req.params.username;
    wagersDAL.getLastWagerByEmail(email).then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//create wager
router.post("/", (req, res) => {
	var wager = req.body;
	var userID = req.cookies.USER_ID;
	var timestamp = new Date();
	var side = wager.wager;

	wagersDAL.createWager(userID, timestamp, side).then((wagerId) => {
		res.status(200).json(wagerId.toString());
	}).catch((e) => {
		res.status(500).json({ error: e });
	});
});

module.exports = router;