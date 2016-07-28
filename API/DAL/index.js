// const recipeRoutes = require("./recipes");

// let constructorMethod = (app) => {
//     app.use("/recipes", recipeRoutes);
//     app.use("/recipes", recipeRoutes);

// };

module.exports = {
    recipeDAL: require("./recipes"),
    recipeCommentsDAL: require("./recipeComments")

};