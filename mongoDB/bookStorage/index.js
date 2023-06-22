const express = require("express");
const cors = require("cors");
const model= require("./model.js");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = 8080;

function bookValidator(book) {
        var errors = [];
        if (!book.title) {
                errors.push("Book must have a title.");
        }
        if (!book.author) {
                errors.push("Book must have an author. ");
        }
        if (!book.rating) {
                errors.push("Book must have a rating. ");
        } else if (isNaN(book.rating)){
		errors.push("Rating must be a number.");
	}
        return errors;
}

app.get("/books", function(req, res) {
	model.Book.find().then(function(books){
		console.log(books);
		res.status(200).send(books);
	})
})

app.get("/books/:bookId", function(req, res) {
	model.Book.findOne({ "_id": req.params.bookId }).then(function(book){
		if (book) {
			console.log(book);
                        res.status(200).send(book);
		} else {
                        res.status(404).send("Book not found. ");
		}
	}).catch(function(errors) {
		console.log(errors);
		res.status(422).send("Bad request. ");
	})
});

app.post("/books", function(req, res) {
	const newBook = new model.Book({
		title: req.body.title,
		author: req.body.author,
		rating: req.body.rating
	});
	
	var errors = bookValidator(newBook);

	if (errors.length == 0){
		newBook.save().then(function () {
			res.status(201).send("Created book! " + "\n" + newBook)
		}).catch(function(errors) {
			res.status(422).send(errors.errors)
		});
	} else {
		res.status(422).send(errors);
	}
});

app.delete("/books/:bookId", function(req, res) {
	var bookId = req.params.bookId;

	model.Book.findOne({ "_id": bookId }).then(book => {
		if (book) {
			model.Book.deleteOne({ "_id": bookId }).then(result => {
				console.log(result.deleteCount);
				res.status(204).send("Book deleted. ");
			})
		} else {
			res.status(404).send("Book not found");
		}
	}).catch(errors => {
		console.log(errors);
		res.status(400).send("Book not found/failed to delete.");
	});
})

app.put("/books/:bookId", function(req, res) {
	var bookId = req.params.bookId;

	model.Book.findOne({ "_id": bookId }).then(book => {
		if (book) {
			var newBook = {
				title: req.body.title,
				author: req.body.author,
				rating: req.body.rating
			}

			let errorList = bookValidator(newBook);

			if (errorList.length > 0) {
				res.status(422).send("Could not update the book.");
			} else {
				book.title = req.body.title;
				book.author = req.body.author;
				book.rating = req.body.rating;

				model.Book.findOneAndUpdate({ "_id": bookId }, book, {new: true, runValidators: true}).then(result => {
					console.log(result);
					res.status(200).send("Updated book. ");
				});

			}
		} else {
			res.status(404).send("Book not found");

		}
	}).catch(errors => {
		console.log(errors);
		res.status(400).send("Book not found.");
	})
})

app.listen(port, function() {
        console.log("Server started on port:", port);
})
