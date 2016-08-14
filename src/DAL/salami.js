const mongoCollections = require("../config/mongoCollections");
const salamiCollection = mongoCollections.grandsalami;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let  getCurrentSalami = function (){
        //get today's salami 
        return salamiCollection.then((salamiCollection) =>{
            return salamiCollection.find({"day": { '$gte': new Date() } }).then((currentSalami) =>{
                console.log("Got today's salami!");
                return currentSalami;
            }, (error) =>{
                console.log("Unable to fetch today's salami!");
            })
        })
    }

let exportedMethods = {
	createSalami(salamiNumber, finalScore, flag, status,timestamp){ 
        //creates a salami for the current day with given information
        if(!timestamp || timestamp === ""){
            timestamp = new Date();
        }
        return salamiCollection().then((salamis) => {
            return salamis.insert({"day": timestamp, "grandsalami": salamiNumber, "finalscore": finalScore,"over_under": flag, "status": status}).then((id) => {
                    console.log("Created Salami!");
                    return id;
                },(error) =>{
                    console.log("Couldn't create salami!!");
                })
        },(error)=>{
            throw error;
        })
    },
    getCurrentGrandSalami(){
        return getCurrentSalami().then((currentSalami)=>{
            return currentSalami;
        }, (error)=>{
            console.log("Unable to today's salami number");
        })
    },
    getSalami(){
        //gets current day's salami number
        return getCurrentSalami().then((currentSalami)=>{
            return currentSalami.grandsalami;
        }, (error)=>{
            console.log("Unable to today's salami number");
        })

    },
    getFinalScore(){
        //gets the final score for the day
        return getCurrentSalami().then((currentSalami)=>{
            return currentSalami.finalscore;
        }, (error)=>{
            console.log("Unable to fetch finalScore for the day");
        })
    },
    getOverUnder(){
    	//returns whether the day resulted in over or under
        return getCurrentSalami().then((currentSalami)=>{
            return currentSalami.over_under;
        }, (error) =>{
            console.log("Unable to fetch over_under");
        })
    }
}

module.exports = exportedMethods;