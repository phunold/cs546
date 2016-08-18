const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
const cookieParser = require('cookie-parser');
const Data = require("../data");
const authData = Data.authData;

//GET METHODS
//login the user and get back the sessionId
router.post("/", (req, res) => {
   var email = req.body.email;
   var passwd = req.body.password;
    //get credentials from body
 
    authData.loginUser(email, passwd).then((response) => {
        var expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        res.cookie("SESSION_ID", response.SESSION_ID, {expires: expiresAt});
        res.cookie("USER_ID", response.USER_ID, {expires: expiresAt});
        res.json(response.SESSION_ID);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;