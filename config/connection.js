//connect to mysql database and make exportable
var mysql = require("mysql");
var connection; 

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
	port: 3306,
	host: "localhost",
	user: "marlo",
	password: "marlosql",
	database: "toDoSeq_db"
});
};

connection.connect(function (err) {
	if (err) {
		console.error(err);
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
