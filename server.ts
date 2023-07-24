// importing express framework
import express from "express";

// import middleware functions
import logging from ("./middleware/logging")
import simpleAuth from "./middleware/simpleAuth";

// importing the random id generator function
import { genRandomString } from "./utils/math";

// creating a new instance of express
const myApp = express();

// to temporarily fix an error
const cors = require("cors");

// Middleware section START

// handle static files
myApp.use(express.static("public"));

myApp.use(cors()); //just fixes it for now!!!

// json body parser middleware to read the body
myApp.use(express.json());

// a logging middleware
myApp.use(logging);

// API KEY validation middleware
// myApp.use(simpleAuth);

// view users route middleware
myApp.use("/users", require("./routes/users"));

// view user route middleware
myApp.use("/user", require("./routes/user"));

// view accounts route middleware
myApp.use("/account", require("./routes/account"));

// view transactions route middleware
myApp.use("/transaction", require("./routes/transaction"));

// Mddleware section FINISH

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
