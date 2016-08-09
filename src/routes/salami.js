const express = require('express');
const router = express.Router();
const DAL = require("../DAL");
const salamiDAL = DAL.salamiDAL;
//const Data = require("../Data");
//const exampleData = Data.exampleData;

//GET METHODS
//get Salami
router.get("/salami", (req, res) => { 
    salamiDAL.getSalami().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//get score
router.get("/score", (req, res) => { 
    salamiDAL.getFinalScore().then((dataList) => {
        res.json(dataList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

//get over/under
router.get("/overunder", (req, res) => { 
    salamiDAL.getOverUnder().then((dataList) => {
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