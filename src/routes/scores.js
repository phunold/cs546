const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const scoresDAL = DAL.scoresDAL;

router.get("/", (req, res) => { 

	scoresDAL.getScores().catch((e) => {

	});
});

router.post("/", (req, res) => {
	
	scoresDAL.updateScores().catch((e) => {

	});
});

module.exports = router;
