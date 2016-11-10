//require express and models, create router
var express = require("express");
var router = express.Router();
var models = require("../models");

var sequelizeConnection = models.sequelize;

//default path
router.get("/", function(req, res) {
	res.redirect("/list");
});

//get full list - load all items using index handlebars page
router.get("/list", function(req, res) {
	models.Task.findAll({})
	.then(function(data) {
		var taskObj = {toDoList: data};
		console.log(taskObj);
		res.render("index", taskObj);
	});


/*	task.all(function(data) {
		var hbsObject = {toDoList: data};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});*/
});

//if user creates a new task
router.post("/list/create", function (req, res) {
	
	models.Task.sync().then(function() {
		return models.Task.create({
			itemName: req.body.itemName,
			isDone: req.body.isDone
		});
			res.redirect("/list");
	});



	/*task.create(["itemName", "isDone"], [req.body.itemName, req.body.isDone], function() {
		res.redirect("/list");
	});*/
});

//if user changes a task to done
router.post("/list/update/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition, " + condition);

	task.update({isDone: req.body.isDone}, condition, function() {
		res.redirect("/list");
	});
});

module.exports = router;