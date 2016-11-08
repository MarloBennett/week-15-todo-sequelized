"use strict";

module.exports = function(sequelize, DataTypes) {

	var Task = sequelize.define("Task", {

		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		itemName: DataTypes.STRING,

		isDone: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}},
		{
		tableName: "toDoList"
	});
	return Task;
};