// importing express framework
const express = require("express");

// create instance of router
const router = myExpress.Router();

// importing api data
const data = require("../apiData.json");

// route

router.get("/", (req: ExpressRequest, res: ExpressResponse) => {
  // log the headers of the request
  console.log("New request to: /", req.headers);

  // destructuring the request queries
  const { userName, num } = req.query;

  // add the id into the api data
  data.users.forEach((user: User, index: number) => {
    user.id = index + 1;
  });

  // make a copy of api json data
  let _data = { ...data };

  // if a specific user is asked for
  if (req.query.userName) {
    // filter api data based on the request query
    _data.users = _data.users.filter((user: User) => {
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
  if (num && Number(num) > 0 && Number(num) < _data.users.length) {
    // chop the array to have the specified length
    _data.users.length = num;
  }

  // send the response to the front
  res.send(_data);
});

module.exports = router;
