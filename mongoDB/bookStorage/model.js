const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.DB_LINK);

//Setup for database
const bookSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Book must have a title."]
        },
        author: {
                type: String,
                required: [true, "Book must have an author."]
        },
        rating: {
                type: Number,
                required: [true, "Book must have a rating."]
        }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = {
	Book: Book
}
