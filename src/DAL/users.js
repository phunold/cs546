const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const leagueCollection = mongoCollections.leagues;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let uniqueEmail = function(email){
    return getUserByEmail(email).then((user)=>{
        console.log("Email already in db. Unique check failed!", user);
        return true;
    },(error)=>{
        console.log("Email not in db. Unique check passed!")
        return false;
    })
}

let validateLeague = function(leagueId){
    //leagueIds are unique
    return leagueCollection.find(leagueId).then((leagueRecord)=>{
        console.log("League validation passed!", leagueRecord)
        return true;
    }, (error)=>{
        console.log("League validation failed!");
        return false;
    })  
}

let exportedMethods = {

    getAllUsers(){
        return userCollection().then((users)=>{
            console.log("Fetched all user documents!")
            return users;
        }, (error)=>{
            throw "Couldn't retrieve user documents!";
        })
    },

    createUser(fname,lname,email,password){
        //create a user with given values
        if(uniqueEmail(email)){
            return userCollection().then((users)=>{
                return users.insert({
                    "fname": fname,
                    "lname": lname,
                    "email": email,
                    "passwd": password,
                    "balance": 0,
                    "record": {
                        "win": 0,
                        "loss": 0,
                        "draw": 0
                        },
                    "sessions" : [],
                    "league_ids": []
                }).then((response)=>{
                    var id = response.ksjdflskdj.insertedId;
                    console.log("Created user!");
                    return id;
                },(error)=>{
                    throw "Couldn't create user!";
                })
            },(error)=>{
                throw "Couldn't retrieve user collection!";
            })
        }
        else{
            console.log("User account already exists for this email!");
        }
       return null;
    },

    joinLeague(userId, leagueId){
        //join a specified league with given user
        if(validateLeague(leagueId)){
                return getUserByID(userId).then((user)=>{
                    user.league_ids.push(leagueId);
                    return userCollection.update(user).then((user)=>{
                        console.log(user._id," is now in leagues ",user.league_ids);
                        return user;
                    },(error)=>{
                        throw "Unable to join league";
                    })
            },(error)=>{
                throw "Couldn't get user for the id";
            })
        }
        else{
            console.log("Couldn't get league for the id");
        }
        return null;
    },

    getUserByID(userId){
        //get user by ID
        return userCollection().find({ "_id" : userCollection }).then((user)=>{ 
            //using find instead of findOne because _id is unique
            console.log("Id found!");
            return user;
        },(error)=>{
            throw "Id not found!";
        })
    },

    getUserByEmail(userEmail){
        //get user by email
        return userCollection().find({ "email" : userEmail }).then((user)=>{
            //using find instead of findOne because email is unique
            console.log("Email found!");
            return user;
        },(error)=>{
            throw "Email not found!";
        })
    },

    updateRecord(userId, result){
        //update a user's record with either win, loss, or draw
         return getUserByID(userId).then((user)=>{
            return userCollection.update(
                {"_id": user.id},
                {
                    $set: {
                        "record":{
                            $inc: {result: 1} //result can be one of the 3 values - win, loss, draw
                        }
                    }
                }
            ).then((user)=>{
                console.log(user._id," records are now updated ",user.record);
                return user;
            },(error)=>{
                throw "Unable to update record!";
            })
        },(error)=>{
            throw "Couldn't get user for the id!Unable to update record!!";
        })
    }
}

module.exports = exportedMethods;