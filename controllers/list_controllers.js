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
	//sequelize find all function
	models.Task.findAll({})
	.then(function(data) {
		//send all objects to handlebars view
		var taskObj = {toDoList: data};
		console.log(taskObj);
		//render handlebars index page
		res.render("index", taskObj);
	});
});

//if user creates a new task
router.post("/list/create", function (req, res) {
	
	//sequelize create function
	models.Task.create({
			itemName: req.body.itemName,
			isDone: req.body.isDone
		});
	res.redirect("/list");
});

//if user changes a task to done
router.post("/list/update/:id", function(req, res) {
	
	//sequelize update function
	models.Task.update({
		//update whether task is done
		isDone: req.body.isDone
	},
	{
		//find relevant task
		where: {id: req.params.id}
	});
	res.redirect("/list");

});

module.exports = router;