const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

//GET METHODS
//Get by ID
router.get("/:id", (req, res) => { 
    usersDAL.getUserByID().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//Get by Email
router.get("/:email", (req, res) => { 
    usersDAL.getUserByEmail().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//POST METHODS
//
router.post("/", (req, res) => {
    res.json({data:"some info"});

});

//PUT METHODS
//
// router.put("/:id", (req, res) => {
   

// });

//DELETE METHODS
//
// router.delete("/:id", (req, res) => {
    
// });

module.exports = router;