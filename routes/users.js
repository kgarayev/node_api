// import express
const express = require("express");

// import router
const router = express.Router();

// importing api data
const apiData = require("../apiData.json");

// route
router.get("/", (req, res) => {
  // log the headers of the request
  console.log("New request to: /", req.headers);

  // destructuring the request queries
  const { userName, num } = req.query;

  // add the id into the api data
  apiData.users.forEach((user, index) => {
    user.id = index + 1;
  });

  // make a copy of api json data
  let _apiData = { ...apiData };

  // if a specific user is asked for
  if (req.query.userName) {
    // filter api data based on the request query
    _apiData = _apiData.users.filter((user) => {
      // convert the first and last names to full name and lowercase
      const fullName = (
        user.firstName +
        " " +
        user.lastName
      ).toLocaleLowerCase();

      // return true or fase depending if the full name includes the requested name
      return fullName.includes(userName.toLocaleLowerCase());
    });
  }

  // if a specific quantity is asked for
  if (num && Number(num) > 0 && Number(num) < _apiData.users.length) {
    // chop the array to have the specified length
    _apiData.users.length = num;
  }

  // send the response to the front
  res.send(_apiData);
});

module.exports = router;
