const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = 8080;

const myBooks = [{
	title: "Harry Potter",
	author: "JK Rowling",
	rating: 5
}];

app.get("/books", function(request, response) {
        response.send(JSON.stringify(myBooks));
})

app.get("/books/:bookId", function(req, res) {
        var index = req.params.bookId;

        if (index >= 0 && index < myBooks.length){
                if (myBooks[index]){
                        // Valid index
                        res.send(JSON.stringify(myBooks[index]));
                } else {
                        // Null (from deleting)
                        res.status(404).send("Book not found. ");
                }
        } else {
                // Invalid index
                res.status(404).send("Book not found. ");
        }

        // Not an index
})

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
	}
	return errors;
}

app.post("/books", function(req, res) {
        const new_book = req.body;

	var errors = bookValidator(new_book);
	if (errors.length == 0){
                myBooks.push(new_book);
                res.status(201).send("Created book. ");
	} else {
                res.status(422).send(errors);
        }
})

app.put("/books/:bookId", function(req, res){
        var index = req.params.bookId;
	const updated_book = req.body;

	var errors = bookValidator(updated_book);

	if (errors.length == 0 ){
		if(index >= 0 && index < myBooks.length){
			myBooks[index] = updated_book;
			res.status(202).send("Updated book. ");
		} else {
			res.status(404).send("Invalid index. ");
		}
	} else {
                res.status(404).send(errors);
        }
})

app.delete("/books/:bookId", function(req, res) {
        var index = req.params.bookId;

        if (index >= 0 && index < myBooks.length){
                if (myBooks[index] != null) {
                        myBooks[index] = null;
                        res.status(200).send("Book deleted. ");

                } else {
                        res.status(400).send("Book not found. ");
                }
        } else {
                res.status(400).send("Book not found. ");
        }
})

app.listen(port, function() {
        console.log("Server started on port:", port);
})
