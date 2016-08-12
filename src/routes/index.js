const exampleRoutes = require("./example");
const usersRoutes = require("./users");
const salamiRoutes = require("./salami");
const wagerRoutes = require("./wager");

const constructorMethod = (app) => {
    app.use("api/example/", exampleRoutes);
    app.use("api/users/", usersRoutes);
    app.use("api/salami", salamiRoutes);
    app.use("api/wager", wagerRoutes);

    //not using this since angular will handle routes
    // app.use("*", (req, res) => {
    //     res.sendStatus(404);
    // });
    
    
};

module.exports = constructorMethod;