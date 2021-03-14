const mongoose = require("mongoose");

const Expense = mongoose.model( 
    "Expense",
    new mongoose.Schema({
        description: String,
        amount: Number
})
.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

);


module.exports = Expense;