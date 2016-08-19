const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const scoresDAL = DAL.scoresDAL;

router.get("/", (req, res) => { 

	scoresDAL.getScores().then((scores)=>{
		res.json(scores);
	}).catch((e) => {
		res.status(500).json({ error: e });
	});
});

router.post("/", (req, res) => {
	var scores = req.body();
	scoresDAL.insertMany(scores).catch((e) => {
		res.status(500).json({ error: e });
	});
});

module.exports = router;
