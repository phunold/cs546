const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const leagueCollection = mongoCollections.leagues;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let uniqueEmail = function(email){
    return getUserByEmail(email).then((user)=>{
        if(user){
            console.log("Email already found in db!");
            return false;
        }
        console.log("Email unique!");
        return true; 
    },(error)=>{
        throw "Couldn't check if email is unique!";       
    })
}

let validateLeague = function(leagueId){
    //leagueIds are unique
    return leagueCollection.find(leagueId).then((leagueRecord)=>{
        if(leagueRecord){
            console.log("League ID is valid!", leagueRecord)
            return true;
        }
        console.log("League ID invalid!");
        return false;
    }, (error)=>{
        throw "Couldn't check if league ID is valid!";     
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

    getTopUsers(){
        return userCollection().then((userColl)=>{
            userColl.find().sort({"record.win": -1}).limit(15).then((topUsers) =>{
                return topUsers;    
            }, (error)=>{
                throw "Couldn't retrieve top users!";
            }) 
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
        return null;
    },

    getUsersByLeague(leagueId){
        return userCollection().then((userColl)=>{
            userColl.findOne({"league_ids": leagueId}).then((users)=>{
                console.log("Found users by league id!");
                return users;
            },(error)=>{
                throw "Cannot find users by league id!";
            })
        },(error)=>{
            throw "ERROR:Getting user by league";
        })
    },

    getUserByID(userId){
        //get user by ID
        return userCollection().then((userColl)=>{
            userColl.findOne({ "_id" : userCollection }).then((user)=>{ 
                console.log("Id found!");
                return user;
            },(error)=>{
                throw "Id not found!";
            })
        },(error)=>{
            throw "ERROR:Getting user by ID";
        })
    },

    getUserByEmail(userEmail){
        //get user by email
        return userCollection().then((userColl)=>{
            userColl.findOne({ "email" : userEmail }).then((user)=>{
                console.log("Email found!");
                return user;
            },(error)=>{
                throw "Email not found!";
            })
        }, (error)=>{
            throw "ERROR:Getting User by Email";
        })
    },
    updateUserSession(userId, sessionId){
        return getUserByID(userId).then((user)=>{
            user.sessions.push(sessionId);
            return userCollection.update(user).then((user)=>{
                return true;
            },(error)=>{
                throw "Unable to join league";
            });
            
        },(error)=>{
            throw "Couldn't get user for the id!Unable to update record!!";
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