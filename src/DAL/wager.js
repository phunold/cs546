const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const usersDAL =  require("./users");
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
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
           
        },(error)=>{
            throw "Userid is invalid! Couldn't create wager!";
        })
    }
}

module.exports = exportedMethods;