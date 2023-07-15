// importing express framework
const express = require("express");

// import the middleware functions
const logging = require("./middleware/simpleLogging");
const auth = require("./middleware/simpleAuth");

// Importing types and creating an alias to avoid any naming conflict elsewhere in the project
const {
  Request: ExpressRequest,
  Response: ExpressResponse,
  Next: ExpressNext,
} = require("express");

// create a TS types for request, response and next
type ExpressRequest = typeof ExpressRequest;
type ExpressResponse = typeof ExpressResponse;
type Next = typeof ExpressNext;

// create a TS interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

// importing api data
const apiData = require("./apiData.json");

// creating a new instance of express
const myApp = express();

// Middleware section START

// handle static files
myApp.use(express.static("public"));

// convert the request body to json
myApp.use(express.json());

// a logging middleware
myApp.use(logging);

// API KEY validation middleware
myApp.use(auth);

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
