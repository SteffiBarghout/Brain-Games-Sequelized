//Allow .env file to be configured and invoked in this file
require("dotenv").config();
//MySQL dependency required
var mysql = require("mysql");
//initiate the connection to MySQL
var connection;

//Connection information for mysql connection, either Jaws db connection or local db connection
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: process.env.MYSQLPASSWORD,
        database: "puzzler_db"
    });
}

//Make connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Export connections for ORM to use
module.exports = connection;