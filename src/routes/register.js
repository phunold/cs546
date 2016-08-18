const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;




//POST METHODS
//Create User
router.post("/", (req, res) => {
    var user = req.body;
	var fname = user.fname;
	var lname = user.lname;
	var email = user.email;
	var passwd = user.passwd;

	usersDAL.createUser(fname, lname, email, passwd).then((success)=>{
        console.log("USER");
        res.status(200).json({result: "Created Successfully"});
    }).catch((e) => {
		res.status(500).json({ error: e });
	});
});


module.exports = router;