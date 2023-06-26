const mongoose = require("mongoose");
const {Schema} = mongoose;
const dotenv = require("dotenv");

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_LINK);

const QuestionSchema = new mongoose.Schema ({
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

//Setup for database
const QuizSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Quiz must have a name."]
        },
	description: String,
	questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

const Question = mongoose.model("Question", QuestionSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {
        Quiz: Quiz,
	Question: Question
}

