const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const leagueCollection = mongoCollections.leagues;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
    createWager(userid, timestamp, side){
        //create a wager with given information for a specified user
        return getUserByID(userid).then((user) =>{
             return wagerCollection().insert(
            {
                "userid": userid,
                "timestamp": timestamp,
                "side": side
            }).then((id)=>{
                console.log("Created wager!");
                return id;
            },(error)=>{
                 throw "Couldn't create wager!";
            })
        },(error)=>{
            throw "Userid is invalid! Couldn't create wager!";
        })
    }
}

module.exports = exportedMethods;