// importing express framework
const express = require("express");

// creating a new instance of express
const myApp = express();

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// handle static file middleware
myApp.use(express.static("public"));

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
