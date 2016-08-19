const authRoutes = require("./auth");
const usersRoutes = require("./users");
const registerRoutes = require("./register");
const salamiRoutes = require("./salami");
const wagerRoutes = require("./wager");
const scoreRoutes = require("./scores");

const constructorMethod = (app) => {
    app.use("/authenticate/", authRoutes);
    app.use("/users/", registerRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/salami/", salamiRoutes);
    app.use("/api/wager/", wagerRoutes);
    app.use("/api/scores/", scoreRoutes);
    //not using this since angular will handle routes
    // app.use("*", (req, res) => {
    //     res.sendStatus(404);
    // });


};

module.exports = constructorMethod;