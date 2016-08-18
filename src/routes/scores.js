const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const scoresDAL = DAL.scoresDAL;

router.get("/", (req, res) => { 

	scoresDAL.getScores().then(()=>{
		
	}).catch((e) => {

	});
});

router.post("/", (req, res) => {
	
	scoresDAL.updateScores().then(()=>{
	

	}).catch((e) => {

	});
});

module.exports = router;
