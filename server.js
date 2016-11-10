//reqire npm packaages, controllers, and models
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var routes = require("./controllers/list_controllers.js");
var models = require("./models/");

var Task = require("./models")["Task"]
Task.sync();

var app = express();

var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use("/", routes);

// override with POST having ?_method=DELETE. not actually used in this app, but instructions specified to include it.
app.use(methodOverride("_method"));

//use handlebars and specify default layout to main
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//set port to listen
app.listen(PORT, function(err, res) {
	if (err) throw err;
	console.log("App listening on PORT: " + PORT);
});

