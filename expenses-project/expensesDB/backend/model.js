 const dotenv = require("dotenv");
 const mongoose = require("mongoose");
 
 dotenv.config();
 
 mongoose.connect(process.env.DB_LINK);
 
 //Setup for database
 const expenseSchema = new mongoose.Schema({
         description: {
                 type: String,
                 required: [true, "Expesnse must have a description."]
         },
         amount: {
                 type: Number,
                 required: [true, "Expense must have an amount"]
         },
         category: {
                 type: String,
                 required: [true, "Expense must have a category."]
         }
 });
 
 const Expense = mongoose.model("Expense", expenseSchema);
 
 module.exports = {
         Expense: Expense
 }

