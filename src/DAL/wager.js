const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.users;
const wagerCollection = mongoCollections.wagers;
const usersDAL = require("./users");
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId;


let exportedMethods = {
    createWager(userid, timeSt, side) {
        return usersDAL.getUserByID(userid).then((user) => {
            if (user) {
                return wagerCollection().then((wagers) => {
                    return wagers.insert(
                        {
                            "userid": user._id,
                            "timestamp": timeSt,
                            "side": side
                        }).then((response) => {
                            if (response.insertedCount === 1) {
                                return response.ops[0]._id;
                            } else { throw "Error inserting"; }

                        }, (error) => {
                            throw "Couldn't create wager!";
                        })
                }, (error) => {
                    throw error;
                });
            }

        }, (error) => {
            throw "Userid is invalid! Couldn't create wager!";
        })
    },
    getLastWagerByEmail(email) {
        return usersDAL.getUserByEmail(email).then((user) => {
            var userId = user._id;
            return wagerCollection().then((wagers) => {
                return wagers.find({ "userid": userId }).sort({ "timestamp": -1 }).limit(1).toArray();
            }).then((latestWager) => {
                return latestWager[0];
            }, (error) => {
                throw error;
            });

        }, function (error) {
            throw error;
        })
    }

}

module.exports = exportedMethods;