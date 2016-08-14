const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
//TODO: const Data = require("../Data");
//TODO: const authData = Data.authData;

//GET METHODS
//login the user and get back the sessionId
router.post("/", (req, res) => {

    console.log("REQ BOD: ",req.body);
   res.json(req.body); //debugging to make sure route is being hit

    //get credentials from body
    authData.loginUser().then((sessionId) => {
        var session = {
            id: sessionId
        }
        res.json(session);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;