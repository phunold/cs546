const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const salamiDAL = DAL.salamiDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

//GET METHODS
//get Salami
router.get("/", (req, res) => { 
    salamiDAL.getCurrentGrandSalami().then((salami) => {
        res.json(salami);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;