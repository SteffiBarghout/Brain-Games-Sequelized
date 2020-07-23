//Express package required
var express = require("express");

//Set up express app
var app = express();
var PORT = process.env.PORT || 3306;

//Require Models for syncing
var db = require("./models");

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Serve Routes.
require("./routes/api-routes")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
})
