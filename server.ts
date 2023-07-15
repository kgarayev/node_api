// importing express framework
const express = require("express");

// Importing types and creating an alias to avoid any naming conflict elsewhere in the project
const {
  Request: ExpressRequest,
  Response: ExpressResponse,
} = require("express");

// importing api data
const apiData = require("./apiData.json");

// creating a new instance of express
const myApp = express();

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// route
myApp.get("/", (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
  // log the headers of the request
  console.log("New request to: /", req.headers);

  // add the id into the api data
  apiData.users.forEach((user: { id: number }, index: number) => {
    user.id = index + 1;
  });

  // send the response to the front
  res.send(apiData);
});

// handle static file middleware
myApp.use(express.static("public"));

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
