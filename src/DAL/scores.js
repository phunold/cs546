const mongoCollections = require("../config/mongoCollections");

const scoresCollection = mongoCollections.scores;

const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let exportedMethods = {

    getScores(){
        return scoresCollection().then((scores)=>{
            console.log("Got scores!");
            return scores;
        }, (error)=>{
            throw "Couldn't get scores!";
        })
		
		
    },
	
	insertMany(scoresParam) {
		return scoresCollection().then((scores)=>{
            return scores.insertMany(scoresParam).then((response)=>{
                if(response.acknowledged) return response.insertedIds;
                else throw "Insertion error!";
            })
        },(error)=>{
            throw "Couldn't retreive scores collection";
        })     
    }   		
}

module.exports = exportedMethods;
