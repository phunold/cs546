const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
const cookieParser = require('cookie-parser');
//TODO: const Data = require("../Data");
//TODO: const authData = Data.authData;

//GET METHODS
//login the user and get back the sessionId
router.post("/", (req, res) => {
   var email = req.body.email;
   var passwd = req.body.passwd;
    //get credentials from body
    authData.loginUser(email, passwd).then((sessionId) => {
        res.cookie("SESSION_ID", now.toString(), {});
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;