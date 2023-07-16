// import express
const express = require("express");

// create an instance of router
const router = express.Router();

// importing joi validator
const { validate } = require("../validation/index");

// router to update the user information
router.patch("/user/:id", async (req, res) => {
  // convert id from string to number
  const id = req.params.id;

  //   destructure user data
  const { users } = req.apiData;

  //   find the index of the user
  const indexOf = users.findIndex((user) => {
    return user.id === id;
  });

  // defensive check
  if (indexOf === -1) {
    res.send({ status: 0, reason: "Id not found" });
    return;
  }

  // validate
  let localErrors = await validate(req.body, "updateUser");

  console.log(localErrors);

  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
  }

  //   destructuring the body
  const { firstName, lastName, number, email, dob, password } = req.body;

  //   for security we have repetition
  if (firstName && typeof firstName === "string") {
    users[indexOf].firstName = firstName;
  }

  if (lastName && typeof lastName === "string") {
    users[indexOf].lastName = lastName;
  }

  if (number && typeof Number(number) === "number") {
    users[indexOf].number = number;
  }

  if (email && typeof email === "string") {
    users[indexOf].email = email;
  }

  if (dob && typeof dob === "string") {
    users[indexOf].dob = dob;
  }

  if (password && typeof password === "string") {
    users[indexOf].password = password;
  }

  res.send({ status: 1, message: "User updated" });
});

// export the module
module.exports = router;
