const mongoCollections = require("../config/mongoCollections");
const salamiCollection = mongoCollections.grandsalami;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let  getCurrentSalami = function(){
        //get today's salami 
        
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
                    throw "Couldn't create salami!!";
                })
        },(error)=>{
            throw error;
        })
    },
    getCurrentGrandSalami(){
        return salamiCollection().then((salamiColl) =>{
            return salamiColl.find().sort({ "day": -1 }).limit(1).toArray();
        }).then((salami)=>{
            return salami[0];
        },(error)=>{
            throw error;
        });
    }
}

module.exports = exportedMethods;