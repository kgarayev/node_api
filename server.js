// importing express framework
const express = require("express");

// importing api data
const apiData = require("./apiData.json");

// import middleware functions
const logging = require("./middleware/logging");
const simpleAuth = require("./middleware/simpleAuth");

// creating a new instance of express
const myApp = express();

// Middleware section START

// handle static files
myApp.use(express.static("public"));

// a logging middleware
myApp.use(logging);

// API KEY validation middleware
myApp.use(simpleAuth);

// route middleware
myApp.use("/users", require("./routes/users"));

// Mddleware section FINISH

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
