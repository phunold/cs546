const mongoCollections = require("../config/mongoCollections");
const _exampleCollection = mongoCollections.example;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
    createUser(){
        //create a user with given values
    },
    joinLeague(){
        //join a specified league with given user
    },
    getUserByID(){
        //get user by ID
    },
    getUserByEmail(){
        //get user by email
    },
    createWager(){
        //create a wager with given information for a specified user
    },
    updateRecord(){
        //update a user's record with either win, loss, or draw
    }
}

module.exports = exportedMethods;