const mongoCollections = require("../config/mongoCollections");

const scoresCollection = mongoCollections.scores;

const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId;

let exportedMethods = {

    getScores() {
        return scoresCollection().then((scores) => {
            return scores.find({}).toArray();
        }, (error) => {
            throw "Couldn't get scores!";
        });


    },

    insertMany(scoresParam) {
        return scoresCollection().then((scores) => {
            return scores.insertMany(scoresParam).then((response) => {
                if (response.insertedCount > 0) return response.insertedIds;
                else throw "Insertion error!";
            })
        }, (error) => {
            throw "Couldn't retrieve scores collection";
        })
    }
}

module.exports = exportedMethods;
