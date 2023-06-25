const express = require("express");
const model = require("./model.js");

const app = express();
app.use(express.json());
const port = 8080;

function quizValidator(quiz) {
        var errors = [];
        if (!quiz.title) {
                errors.push("Quiz must have a title.");
        }
        if (!quiz.description) {
                errors.push("Quiz must have an description. ");
        }
        return errors;
}

function questionValidator(question) {
        var errors = [];
        if (!question.text) {
                errors.push("Question must have a text.");
        }
        if (!question.answers) {
                errors.push("Question must have an anwser. ");
        }
        return errors;
}

/*
==============================================================================
Code for Quizes 
==============================================================================
*/

//app.get("/quizes", function(req, res) {
//        model.Quiz.find().then(function(quizes){
//                console.log(quizes);
//                res.status(200).send(quizes);
//        })
//})
//
//app.get("/quizes/:quizId", function(req, res) {
//        model.Quiz.findOne({ "_id": req.params.quizId }).then(function(quiz){
//                if (quiz) {
//                        console.log(quiz);
//                        res.status(200).send(quiz);
//                } else {
//                        res.status(404).send("Quiz not found. ");
//                }
//        }).catch(function(errors) {
//                console.log(errors);
//                res.status(422).send("Bad request. ");
//        })
//});
//
//app.post("/quizes", function(req, res) {
//        const newQuiz = new model.Quiz({
//                title: req.body.title,
//                description: req.body.description
//        });
//
//        var errors = quizValidator(newQuiz);
//
//        if (errors.length == 0){
//                newQuiz.save().then(function () {
//                        res.status(201).send("Created quiz! " + "\n" + newQuiz)
//                }).catch(function(errors) {
//                        res.status(422).send(errors.errors)
//                });
//        } else {
//                res.status(422).send(errors);
//        }
//});
//
//app.delete("/quizes/:quizId", function(req, res) {
//        var quizId = req.params.quizId;
//
//        model.Quiz.findOne({ "_id": quizId }).then(quiz => {
//                if (quiz) {
//                        model.Quiz.deleteOne({ "_id": quizId }).then(result => {
//                                console.log(result.deleteCount);
//                                res.status(204).send("Quiz deleted. ");
//                        })
//                } else {
//                        res.status(404).send("Quiz not found");
//                }
//        }).catch(errors => {
//                console.log(errors);
//                res.status(400).send("Quiz not found/failed to delete.");
//        });
//})
//
//app.put("/quizes/:quizId", function(req, res) {
//        var quizId = req.params.quizId;
//
//        model.Quiz.findOne({ "_id": quizId }).then(quiz => {
//                if (quiz) {
//                        var newQuiz = {
//                                title: req.body.title,
//                                description: req.body.description
//                        }
//
//                        let errorList = quizValidator(newQuiz);
//
//                        if (errorList.length > 0) {
//                                res.status(422).send("Could not update the quiz.");
//                        } else {
//                                quiz.title = req.body.title;
//                                quiz.description = req.body.description;
//
//                                model.Quiz.findOneAndUpdate({ "_id": quizId }, quiz, {new: true,     runValidators: true}).then(result => {
//                                        console.log(result);
//                                        res.status(200).send("Updated quiz. ");
//                                });
//
//                        }
//                } else {
//                        res.status(404).send("Quiz not found");
//
//                }
//        }).catch(errors => {
//                console.log(errors);
//                res.status(400).send("Quiz not found.");
//        })
//})
//
///*
//==============================================================================
//Code for Questions
//==============================================================================
//*/
//
//app.get("/questions", function(req, res) {
//        model.Question.find().then(function(questions){
//                console.log(questions);
//                res.status(200).send(questions);
//        })
//})
//
//app.get("/questions/:questionId", function(req, res) {
//        model.Question.findOne({ "_id": req.params.questionId }).then(function(question){
//                if (question) {
//                        console.log(question);
//                        res.status(200).send(question);
//                } else {
//                        res.status(404).send("Question not found. ");
//                }
//        }).catch(function(errors) {
//                console.log(errors);
//                res.status(422).send("Bad request. ");
//        })
//});
//
//app.post("/questions", function(req, res) {
//        const newQuestion = new model.Question({
//                text: req.body.text,
//                answers: req.body.answers
//        });
//
//        var errors = questionValidator(newQuestion);
//
//        if (errors.length == 0){
//                newQuestion.save().then(function () {
//                        res.status(201).send("Created question! " + "\n" + newQuestion)
//                }).catch(function(errors) {
//                        res.status(422).send(errors.errors)
//                });
//        } else {
//                res.status(422).send(errors);
//        }
//});
//
//app.delete("/questions/:questionId", function(req, res) {
//        var questionId = req.params.questionId;
//
//        model.Question.findOne({ "_id": questionId }).then(question => {
//                if (question) {
//                        model.Question.deleteOne({ "_id": questionId }).then(result => {
//                                console.log(result.deleteCount);
//                                res.status(204).send("Question deleted. ");
//                        })
//                } else {
//                        res.status(404).send("Question not found");
//                }
//        }).catch(errors => {
//                console.log(errors);
//                res.status(400).send("Question not found/failed to delete.");
//        });
//})
//
//app.put("/questions/:questionId", function(req, res) {
//        var questionId = req.params.questionId;
//
//        model.Question.findOne({ "_id": questionId }).then(question => {
//                if (question) {
//                        var newQuestion = {
//                                text: req.body.text,
//                                answers: req.body.answers,
//                        }
//
//                        let errorList = questionValidator(newQuestion);
//
//                        if (errorList.length > 0) {
//                                res.status(422).send("Could not update the question.");
//                        } else {
//                                question.text = req.body.text;
//                                question.answers = req.body.answers;
//
//                                model.Question.findOneAndUpdate({ "_id": questionId }, question, {new: true,     runValidators: true}).then(result => {
//                                        console.log(result);
//                                        res.status(200).send("Updated question. ");
//                                });
//
//                        }
//                } else {
//                        res.status(404).send("Question not found");
//
//                }
//        }).catch(errors => {
//                console.log(errors);
//                res.status(400).send("Question not found.");
//        })
//})

app.listen(port, function() {
        console.log("Server started on port:", port);
})
