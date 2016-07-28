const dbConnection = require("../config/mongoConnection");
const DAL = require("../DAL/");
const uuid = require('node-uuid');
const exampleDAL = DAL.exampleDAL;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        //TODO: populate DB
        return exampleDAL.exampleDBCall();    
    }).then((res) => {
        console.log(res);
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
