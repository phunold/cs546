const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const exampleDAL = DAL.exampleDAL;
const Data = require("../Data");
const exampleData = Data.exampleData;

//GET METHODS
//
router.get("/", (req, res) => { 
    exampleDAL.exampleDBCall().then((dataList) => {
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