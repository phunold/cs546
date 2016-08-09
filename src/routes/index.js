const exampleRoutes = require("./example");
const usersRoutes = require("./users");
const salamiRoutes = require("./salami");
const authRoutes = require("./auth");

const constructorMethod = (app) => {
    app.use("api/example/", exampleRoutes);
    app.use("api/users/", usersRoutes);

    //not using this since angular will handle routes
    // app.use("*", (req, res) => {
    //     res.sendStatus(404);
    // });
    
    
};

module.exports = constructorMethod;