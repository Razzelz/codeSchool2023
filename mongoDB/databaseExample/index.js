const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.DB_LINK);

console.log(process.env.DB_LINK);

mongoose.set("strictQuery", false);

//Setup for database
const animalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Animal must have a name."]
	},
	email: {
		type: String,
		unique: true
	},
	weight: Number,
	species: String,
	birthday: Date
});


//Setup for code
const Animal = mongoose.model("Animal", animalSchema);

//Creating a new animal
const newAnimal = new Animal({
	name: "Marty the 4th",
	email: "move@it.com",
	weight: 300,
	species: "Zebra",
	birthday: new Date("Jan 3 1950")
})

newAnimal.save().then(
	console.log("Done")
).catch(function(errors) {
	console.log(errors.errors);
});
//
//console.log(newHippo);
//
//Finding animals:
//Animal.find({"species": "Hippo", "weight": {$gte: 3000}}).then(function(animals) {
//	console.log(animals);
//});

//Find a single animal
Animal.findOne({"_id": "6493209e842f4177982d8175"}).then(function(animal) {
	if (animal){
		console.log(animal);
	} else {
		console.log("Animal not found. ");
	}
})


