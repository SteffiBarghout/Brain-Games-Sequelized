var orm = require("../config/orm.js");

var Puzzle = {
    all: function(cb) {
        orm.all("puzzles", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("puzzles", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("puzzles", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller.
module.exports = Puzzle;