const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const leagueCollection = mongoCollections.leagues;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 

let uniqueEmail = function(email){
    return exportedMethods.getUserByEmail(email).then((user)=>{
        if(user){
            return false;
        }else{
            return true;
        }
    },(error)=>{
        console.log("Email not in db. Unique check passed!",error);
        throw error;
    })
}

let validateLeague = function(leagueId){
    return leagueCollection().then((leagueColl)=>{
        console.log("LeagueColl", leagueColl)
        leagueColl.find(leagueId).then((leagueRecord)=>{
        if(leagueRecord){
            console.log("League ID is valid!", leagueRecord)
            return true;
        }
        console.log("League ID invalid!");
        return false;
        }, (error)=>{
            throw "Couldn't check if league ID is valid!";      
        }) 
    },(error)=>{
        throw "League collection couldn't be retrieved!"
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
        if(uniqueEmail(email)){
            return userCollection().then((userColl)=>{
                return userColl.insert({
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
                        if(response.insertedCount == 1){
                            return response.ops[0]._id;
                        }
                        throw "Could not create user";                       
                    },(error)=>{
                        console.log(error);
                        throw "Couldn't create user!";
                    })
            },(error)=>{
                console.log("WHOOOPS: ",error);
                throw error;
            });
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
        return userCollection().then((userColl)=>{
            userColl.findOne({ "_id" : userId }).then((user)=>{ 
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

        return userCollection().then((userColl)=>{
            userColl.findOne({ "email" : userEmail }).then((user)=>{
                if (user)
                {   console.log("Email found!");
                    return user;
                }
                console.log("Email not found!");
                return null;
            }, (error)=>{
                throw "ERROR:Getting User by Email";
            })
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