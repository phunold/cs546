const mongoCollections = require("../config/mongoCollections");
const _exampleCollection = mongoCollections.example;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
	createSalami(){
        //creates a salami for the current day with given information
    },
    getSalami(){
        //gets current day's salami number
    },
    getFinalScore(){
        //gets the final score for the day
    },
    getOverUnder(){
    	//returns whether the day resulted in over or under
    }
}

module.exports = exportedMethods;