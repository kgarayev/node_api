// import express
const express = require("express");

// create an instance of router
const router = express.Router();

// importing joi validator
const { validate } = require("../validation/index");

// importing the sql query function
const asyncMySQL = require("../database/connection");

// router to update the user information
router.patch("/user/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // validate
  let localErrors = await validate(req.body, "updateUser");

  // logging local errors
  // console.log(localErrors);

  // checking if local errors exist
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const { firstName, lastName, number, email, dob, password } = req.body;

  try {
    // First, check if user with this id exists
    const results = await asyncMySQL(
      `SELECT * FROM users WHERE id LIKE "${id}"`
    );

    // If no user exists with this id, return an error
    if (results.length === 0) {
      res.send({ status: 0, message: "Invalid user id" });
      return;
    }

    //   for security we have repetition
    if (firstName && typeof firstName === "string") {
      await asyncMySQL(
        `UPDATE users SET first_name = "${firstName}" WHERE id LIKE "${id}"`
      );
    }

    if (lastName && typeof lastName === "string") {
      await asyncMySQL(
        `UPDATE users SET last_name = "${lastName}" WHERE id LIKE "${id}"`
      );
    }

    if (number && typeof Number(number) === "number") {
      await asyncMySQL(
        `UPDATE users SET number = "${number}" WHERE id LIKE "${id}"`
      );
    }

    if (email && typeof email === "string") {
      await asyncMySQL(
        `UPDATE users SET email = "${email}" WHERE id LIKE "${id}"`
      );
    }

    if (dob && typeof dob === "string") {
      await asyncMySQL(
        `UPDATE users SET dob = STR_TO_DATE("${dob}", "%d/%m/%Y") WHERE id LIKE "${id}"`
      );
    }

    if (password && typeof password === "string") {
      await asyncMySQL(
        `UPDATE users SET password = "${password}" WHERE id LIKE "${id}"`
      );
    }
    // sending the final update to the user
    res.send({ status: 1, message: "User updated" });
    return;
  } catch (error) {
    // catch errors if any
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// export the module
module.exports = router;
