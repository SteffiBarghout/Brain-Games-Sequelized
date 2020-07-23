module.exports = function (sequelize, DataTypes) {
    var Puzzle = sequelize.define("Puzzle", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    });
    return Puzzle;
};