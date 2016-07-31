const exampleRoutes = require("./example");

const constructorMethod = (app) => {
    app.use("api/example/", exampleRoutes);

    //not using this since angular will handle routes
    // app.use("*", (req, res) => {
    //     res.sendStatus(404);
    // });
    
    
};

module.exports = constructorMethod;