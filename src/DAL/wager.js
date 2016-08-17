const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const usersDAL =  require("./users");
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
<<<<<<< HEAD
    createWager(userid, timestamp, side){
        //create a wager with given information
        return getUserByID(userid).then((user) =>{
                    console.log("Really INSIDE:)");

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
=======
    createWager(userid, timeSt, side){
        return usersDAL.getUserByID(userid).then((user) =>{
            if(user){
                 return wagerCollection().then((wagers)=>{
                    wagers.insert(
                    {
                        "userid": user._id,
                        "timestamp": timeSt,
                        "side": side
                    }).then((id)=>{
                        console.log("Created wager!");
                        return id;
                    },(error)=>{
                        throw "Couldn't create wager!";
                    })
                })
            }
           
>>>>>>> 727da98784e37a83b58450c1dda7e16152a94fae
        },(error)=>{
            throw "Userid is invalid! Couldn't create wager!";
        })
    }
}

module.exports = exportedMethods;