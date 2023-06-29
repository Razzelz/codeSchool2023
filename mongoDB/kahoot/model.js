const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose=require("passport-local-mongoose");
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

/*
==============================
Example Question JSON
{
    "text": "1+1",
    "answers": [
        {"answerText": "2", "isTrue": true, "answerText": "3", "isTrue": false}
    ]
}
==============================
*/

const QuizSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Quiz must have a name."]
        },
	description: String,
	questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "User must have an email."]
	},
	password: {
		type: String,
		required: [true, "User must have a password."]
	}
});

UserSchema.plugin(passportLocalMongoose);

const Question = mongoose.model("Question", QuestionSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);
const User = module.exports = mongoose.model("User", UserSchema);

module.exports = {
        Quiz: Quiz,
	Question: Question,
	User: User
}

