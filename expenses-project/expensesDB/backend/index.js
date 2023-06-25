const express = require("express");
const cors = require("cors");
const model = require("./model.js");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = 8080;

function expenseValidator(expense) {
        var errors = [];
        if (!expense.description) {
                errors.push("Expense must have a description.");
        }
        if (!expense.amount) {
                errors.push("Expense must have an amount. ");
        }
	if (isNaN(expense.amount)) {
                errors.push("Amount must be a number.");
	}
        if (!expense.category) {
                errors.push("Expense must have a category. ");
        }
        return errors;
}

app.get("/expenses", function(req, res) {
        model.Expense.find().then(function(expenses){
                console.log(expenses);
                res.status(200).send(expenses);
        })
})

app.get("/expenses/:expenseId", function(req, res) {
        model.Expense.findOne({ "_id": req.params.expenseId }).then(function(expense){
                if (expense) {
                        console.log(expense);
                        res.status(200).send(expense);
                } else {
                        res.status(404).send("Expense not found. ");
                }
        }).catch(function(errors) {
                console.log(errors);
                res.status(422).send("Bad request. ");
        })
});

app.post("/expenses", function(req, res) {
        const newExpense = new model.Expense({
                description: req.body.description,
                amount: req.body.amount,
                category: req.body.category
        });

        var errors = expenseValidator(newExpense);

        if (errors.length == 0){
                newExpense.save().then(function () {
                        res.status(201).send("Created expense! " + "\n" + newExpense)
                }).catch(function(errors) {
                        res.status(422).send(errors.errors)
                });
        } else {
                res.status(422).send(errors);
        }
});

app.delete("/expenses/:expenseId", function(req, res) {
        var expenseId = req.params.expenseId;

        model.Expense.findOne({ "_id": expenseId }).then(expense => {
                if (expense) {
                        model.Expense.deleteOne({ "_id": expenseId }).then(result => {
                                console.log(result.deleteCount);
                                res.status(204).send("Expense deleted. ");
                        })
                } else {
                        res.status(404).send("Expense not found");
                }
        }).catch(errors => {
                console.log(errors);
                res.status(400).send("Expense not found/failed to delete.");
        });
})

app.put("/expenses/:expenseId", function(req, res) {
        var expenseId = req.params.expenseId;

        model.Expense.findOne({ "_id": expenseId }).then(expense => {
                if (expense) {
                        var newExpense = {
                                description: req.body.description,
                                amount: req.body.amount,
                                category: req.body.category
                        }

                        let errorList = expenseValidator(newExpense);

                        if (errorList.length > 0) {
                                res.status(422).send("Could not update the expense.");
                        } else {
                                expense.description = req.body.description;
                                expense.amount = req.body.amount;
                                expense.category = req.body.category;

                                model.Expense.findOneAndUpdate({ "_id": expenseId }, expense, {new: true, runValidators: true}).then(result => {
                                        console.log(result);
                                        res.status(200).send("Updated expense. ");
                                });

                        }
                } else {
                        res.status(404).send("Expense not found");

                }
        }).catch(errors => {
                console.log(errors);
                res.status(400).send("Expense not found.");
        })
})

app.listen(port, function() {
        console.log("Server started on port:", port);
})

