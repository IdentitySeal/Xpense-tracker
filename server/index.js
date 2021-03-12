const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('custom-env').env('staging')




const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require('./routes/auth.js')(app);
require('./routes/user.js')(app);
require('./routes/expense-router')(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models/");
const Role = db.role;
// `mongodb+srv://expenseDB:${process.env.DB_PASSWORD}@expensecluster.c62ij.mongodb.net/expenseDB?retryWrites=true&w=majority`
db.mongoose
.connect(`mongodb://expenseDB:${process.env.DB_PASSWORD}@expensecluster-shard-00-00.c62ij.mongodb.net:27017,expensecluster-shard-00-01.c62ij.mongodb.net:27017,expensecluster-shard-00-02.c62ij.mongodb.net:27017/expenseDB?ssl=true&replicaSet=atlas-2gpmpo-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});

function initial() {
Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        new Role({
        name: "user"
    }).save(err => {
        if (err) {
        console.log("error", err);
        }

        console.log("added 'user' to roles collection");
    });    
    new Role({
        name: "admin"
    }).save(err => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
    });
    }
});
}

