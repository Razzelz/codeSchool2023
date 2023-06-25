const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_LINK);

//Setup for database
const quizSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Quiz must have a name."]
        },
        description: {
		type: String,
		required: [true, "Quiz must have a description."]
        },
});

const questionSchema = new mongoose.Schema ({
	text: {
		type: String,
		required: [true, "Question must have text."]
	},
	answers: [{
		answerText: {
			type: String,
			required: [true, "Answer must have text."]
		},
		isTrue: Boolean
	}]
});

const Quiz = mongoose.model("quiz", quizSchema);
const Question = mongoose.model("question", questionSchema);

module.exports = {
        Quiz: Quiz,
	Question: Question
}

