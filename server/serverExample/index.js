const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
const port = 8080;

var myReminders = ["Make dinner", "Take out trash", "Sleep"];

app.get("/reminders", function(request, response) {
	response.send(JSON.stringify(myReminders));
})

app.get("/reminders/:reminderId", function(req, res) {
	var index = req.params.reminderId;

	if (index >= 0 && index < myReminders.length){
		if (myReminders[index]){
			// Valid index
			res.send(JSON.stringify(myReminders[index]));
		} else {
			// Index null
			res.status(404).send("Reminder not found. ");
		}
	} else {
		// Invalid index
		res.status(404).send("Reminder not found. ");
	}
	
	// Not an index
})

app.post("/reminders", function(req, res) {
	var new_reminder = req.body.new_reminder;

	if (new_reminder) {
		myReminders.push(new_reminder);
		res.status(201).send("Created reminder. ");
	} else {
		res.status(422).send("Invalid request. ");
	}
})

app.put("/reminders/:reminderId", function(req, res){
	var index = req.params.reminderId;

	if (index >= 0 || index < myReminders.length){
		var updated_reminder = req.body.updated_reminder;
		if (updated_reminder){
			myReminders[index] = updated_reminder;
			res.status(204);
		} else {
			res.status(422).send("Invalid request. ");
		}

	} else {
		res.status(404).send("Reminder not found");
	}
})

app.delete("/reminders/:reminderId", function(req, res) {
	var index = req.params.reminderId;

	if (index >= 0 && index < myReminders.length){
		if (myReminders[index] != null) {
			myReminders[index] = null;
			res.status(204).send("Reminder deleted. ");

		} else {
			res.status(400).send("Reminder not found. ");
		}
	} else {
		res.status(400).send("Reminder not found. ");
	}
})

app.listen(port, function() {
	console.log("Server started on port: ", port);
})

