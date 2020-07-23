var db = require ("../models");

module.exports = function(app) {
    app.get("/api/puzzles", function(req,res) {
        db.Puzzle.findAll({}).then(function(dbPuzzle) {
            res.json(dbPuzzle);
        });
    });

    app.post("/api/puzzles", function(req, res) {

    });

    app.delete("/api/puzzles/:id", function(req, res) {

    });
    
    app.put("/api/puzzles", function(req, res) {

    });
};