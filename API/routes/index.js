const exampleRoutes = require("./example");

const constructorMethod = (app) => {
    app.use("API/example/", exampleRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;