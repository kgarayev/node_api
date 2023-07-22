// importing express framework
const express = require("express");

// import middleware functions
const logging = require("./middleware/logging");
const simpleAuth = require("./middleware/simpleAuth");

// importing the random id generator function
// const { genRandomString } = require("./utils/math");

// creating a new instance of express
const myApp = express();

// Middleware section START

// handle static files
myApp.use(express.static("public"));

// json body parser middleware to read the body
myApp.use(express.json());

// a logging middleware
myApp.use(logging);

// API KEY validation middleware
// myApp.use(simpleAuth);

// view users route middleware
// myApp.use("/users", require("./routes/users"));

// route middleware
// myApp.use("/", require("./routes/demo"));

// get route middleware
myApp.use("/get", require("./routes/get"));

// delete route middleware
// myApp.use("/delete", require("./routes/delete"));

// // add route middleware
// myApp.use("/add", require("./routes/add"));

// // update route middleware
// myApp.use("/update", require("./routes/update"));

// Mddleware section FINISH

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
