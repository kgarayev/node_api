// importing express framework
const express = require("express");

// Importing types and creating an alias to avoid any naming conflict elsewhere in the project
const {
  Request: ExpressRequest,
  Response: ExpressResponse,
} = require("express");

// importing api data
const apiData = require("./apiData.json");

// create a TS interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

// creating a new instance of express
const myApp = express();

// route
myApp.get(
  "/users",
  (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    // log the headers of the request
    console.log("New request to: /", req.headers);

    // add the id into the api data
    apiData.users.forEach((user: User, index: number) => {
      user.id = index + 1;
    });

    // make a copy of api json data
    let _apiData = { ...apiData };

    // if a specific quantity is asked for
    if (req.query.num) {
      _apiData.users.length = req.query.num;
    }

    // if a specific user is asked for
    if (req.query.userName) {
      console.log(req.query);

      // filter api data based on the request query
      _apiData = _apiData.users.filter((user: User) => {
        // convert the first and last names to full name and lowercase
        const fullName = (
          user.firstName +
          " " +
          user.lastName
        ).toLocaleLowerCase();

        // return true or fase depending if the full name includes the requested name
        return fullName.includes(req.query.userName.toLocaleLowerCase());
      });
    }

    // send the response to the front
    res.send(_apiData);
  }
);

// handle static file middleware
myApp.use(express.static("public"));

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
