const mongoCollections = require("../config/mongoCollections");
const _exampleCollection = mongoCollections.example;
const uuid = require('node-uuid');
const ObjectId = require('mongodb').ObjectId; 


let exportedMethods = {
    exampleDBCall() {
        return _exampleCollection().then((exampleCollection) => {
            return exampleCollection.find({}).toArray();
        },(error)=>{
            throw error;
        })
    },
    someFunction(){
        //go do this...
        
    }
}

module.exports = exportedMethods;