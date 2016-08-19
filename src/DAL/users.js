const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const leagueCollection = mongoCollections.leagues;
const uuid = require('node-uuid');
var bcrypt = require("bcrypt-nodejs");
const ObjectId = require('mongodb').ObjectId; 

let uniqueEmail = function(email){
    
    return exportedMethods.getUserByEmail(email).then((user)=>{
        if(user){
            console.log("Email already found in db!");
            return false;
        }
        else{
            console.log("Email unique!");
            return true;
        } 
    },(error)=>{
        throw "Couldn't check if email is unique!";       
    })
}

let validateLeague = function(leagueId){
    return leagueCollection().then((leagueColl)=>{
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
        return uniqueEmail(email).then((uniqueEmail)=>{
            if(uniqueEmail){
                return userCollection().then((users)=>{
                    return users.insert({
                        "fname": fname,
                        "lname": lname,
                        "email": email,
                        "passwd": bcrypt.hashSync(password),
                        "balance": 0,
                        "record": {
                            "win": 0,
                            "loss": 0,
                            "draw": 0
                            },
                        "sessions" : [],
                        "league_ids": []
                    }).then((response)=>{
                        if(response.insertedCount === 1){
                            var id = response.ops[0]._id;
                            console.log("Created user!",id);
                            return id;
                        }else{
                            throw "Could not create user!";
                        }
                    },(error)=>{
                        console.log(error);
                        throw "Couldn't create user!";
                    })
                },(error)=>{
                    throw "Couldn't retrieve user collection!";
                })
            }
            else{
                throw "User account already exists for this email!";
            }
        },(error)=>{
            throw error;
        });

    },

    joinLeague(userId, leagueId){
        //join a specified league with given user
        if(validateLeague(leagueId)){
                return exportedMethods.getUserByID(userId).then((user)=>{
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
    createLeague(users,leagueName){
        //users is an arary o fIDs 
        return leagueCollection().then((leagues)=>{
            var league = {
                "userIds": users,
                "name": leagueName
            }
            return leagues.insert(league).then
        })
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
            return userColl.findOne({ "_id" : ObjectId(userId) }).then((user)=>{
                if(user){
                    return user;
                }else{
                    throw "User not found";
                }
            },(error)=>{
                throw "Id not found!";
            })
        },(error)=>{
            throw "ERROR:Getting user by ID";
        })
    },

    getUserByEmail(userEmail){
        return userCollection().then((userColl)=>{
            return userColl.findOne({ "email" : userEmail }).then((user)=>{
                if (user)
                {   
                    console.log("Email found!!!");
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
        return exportedMethods.getUserByID(userId).then((user)=>{
            user.sessions.push(sessionId);
            return userCollection().then((userColl)=>{
                return userColl.update({"_id":user._id},user).then((updateResponse)=>{
                    if(updateResponse.result.nModified ===1){
                        return {
                            USER_ID: user._id.toString(),
                            SESSION_ID: sessionId    
                        };
                    }else{
                        throw "Nothing updated.";
                    }
                },(error)=>{
                    throw error;
                });
            },(error)=>{
                throw "Unable to join league";
            });
            
        },(error)=>{
            throw "Couldn't get user for the id!Unable to update record!!";
        })
    },
    removeUserSession(userId, sessionId){
	    console.log("Removing:"+userId+" "+sessionId);
        return exportedMethods.getUserByID(userId).then((user)=>{
	        var index = user.sessions.indexOf(sessionId);
            user.sessions.splice(index, 1);
            return userCollection().then((userColl)=>{
                return userColl.update({"_id":user._id},user).then((updateResponse)=>{
                    if(updateResponse.result.nModified ===1){
                        return true;
                    }else{
                        throw "Nothing updated.";
                    }
                },(error)=>{
                    throw error;
                });
            },(error)=>{
                throw "Unable to join league";
            });
            
        },(error)=>{
            throw "Couldn't get user for the id!Unable to update record!!";
        })
    },
    updateRecord(userId, result){
        //update a user's record with either win, loss, or draw
         return exportedMethods.getUserByID(userId).then((user)=>{
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
