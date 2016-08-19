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
        return leagueColl.findOne({"_id":leagueId}).then((leagueRecord)=>{
            if(leagueRecord){
                return true;
            }
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
            return userColl.find().sort({"record.win": -1}).limit(3).toArray().then((topUsers) =>{
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
                        "leagueId" : ""
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
        return validateLeague(leagueId).then((leagueExists)=>{
            if(leagueExists){
                 return exportedMethods.getUserByID(userId).then((user)=>{
                    user.leagueId = leagueId;
                    return userCollection().then((userColl)=>{
                        return userColl.update({"_id":user._id},user).then((updateResponse)=>{
                            return exportedMethods.addUserToLeague(user._id, user.leagueId);
                        }).then((result)=>{
                            console.log("Users added to league");
                        },(error)=>{
                            throw error;
                        });
                    },(error)=>{
                        throw "Unable to join league";
                    });
                 },(error)=>{
                    throw "Couldn't get user for the id";
                 });


            }else{
                console.log("League Does not Exist");
                throw "League Does not Exist";
            }
            
        },(error)=>{
            throw error;
        });
                

    },
    getLeague(leagueId){
       return leagueCollection().then((leagues)=>{
            return leagues.findOne({"_id":ObjectId(leagueId)}).then((league)=>{
                return league;
            },(error)=>{
                throw error;
            });
        },(error)=>{
            throw error;
        });  
    },
    addUserToLeague(userId, leagueId){
        return leagueCollection().then((leagues)=>{
            return exportedMethods.getLeague(leagueId).then((league)=>{
                league.userIds.push(userId);
                return leagues.update({"_id":league._id},league);
            }).then((updateRes)=>{
                console.log("UPDATE SUCCESS");
                return true;
            },(error)=>{
                throw error;
            });
        },(error)=>{
            throw error;
        });
    },
    createLeague(users,leagueName){
        //users is an arary o fIDs 
        return leagueCollection().then((leagues)=>{
            var league = {
                "userIds": users,
                "name": leagueName
            }
            return leagues.insert(league).then((success)=>{
                if(success.insertedCount ===1){
                    return success.ops[0]._id;
                }else{
                    throw "Unsuccessfully Created League"
                }
            },(error)=>{
                throw league;
            })
        })
    },

    getUsersByLeague(leagueIdentifier){

        return userCollection().then((userColl)=>{
                return userColl.find({"leagueId":ObjectId(leagueIdentifier)}).toArray();
            }).then((users)=>{
                if(users.length>0){
                    var leagueUsers = [];
                    for(var i = 0; i< users.length; i++){
                        leagueUsers.push({
                            fname: users[i].fname,
                            lname: users[i].lname,
                            record: users[i].record
                        });
                    }
                    console.log(leagueUsers);
                    return leagueUsers;
                } throw "No users found";
                
            },(error)=>{
                throw "Error Getting users by league";
            });
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
    updateRecord(userId, newRecord){
        //update a user's record with either win, loss, or draw
         return exportedMethods.getUserByID(userId).then((user)=>{
            return userCollection().then((userColl)=>{
                user.record = newRecord;
                console.log(user);
                return userColl.update({"_id":user._id},user);
            }).then((success)=>{
                if(success.result.nModified ===1){
                    return true;
                }else{
                    throw "Update Record Error";
                }
            },(error)=>{
                throw "Unable to update record!";
            })
        },(error)=>{
            throw "Couldn't get user for the id!Unable to update record!!";
        })
    }
}

module.exports = exportedMethods;
