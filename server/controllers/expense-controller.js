const Expense = require('../models/expense-model');
const db = require("../models");


// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Expense
    const expense = new Expense({
        amount: req.body.amount,
        description: req.body.description,
    });

    // Save Tutorial in the database
    expense
        .save(expense)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Expense."
            });
        });
};

exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? {
        description: {
            $regex: new RegExp(description),
            $options: "i"
        }
    } : {};

    Expense.find(condition)
    // .populate("user", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expenses."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Expense.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Expesne with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Expense with id=" + id
                });
        });
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Expense.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Expense with id=${id}. Maybe Expense was not found!`
                });
            } else res.send({
                message: "Expense was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Expense with id=" + id
            });
        });
};
// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Expense.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`
                });
            } else {
                res.send({
                    message: "Expense was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Expense with id=" + id
            });
        });
};
// Delete all Expense from the database.
exports.deleteAll = (req, res) => {
    Expense.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Expenses were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Expenses."
            });
        });
};