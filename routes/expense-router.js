const { authJwt } = require("../middlewares");


module.exports = app => {
    const expenses = require("../controllers/expense-controller.js");
    var router = require("express").Router();

    // Create a new Expenses
    router.post("/", expenses.create,[authJwt.verifyToken]);

    // Retrieve all Expenses
    router.get("/", expenses.findAll,[authJwt.verifyToken]);

    // Retrieve a single Expense with id
    router.get("/:id", expenses.findOne,[authJwt.verifyToken]);

    // Update a Expense with id
    router.put("/:id", expenses.update,[authJwt.verifyToken]);

    // Delete a Expense with id
    router.delete("/:id", expenses.delete,[authJwt.verifyToken]);

    // Create a new Expense
    router.delete("/", expenses.deleteAll,[authJwt.verifyToken]);

    app.use('/api/expenses', router);
};