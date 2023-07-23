// IMPORTING STUFF:
// import express
const express = require("express");

// import router
const router = express.Router();

// importing the random id generator function
const { genRandomString } = require("../utils/math");

// importing joi validator
const { validate } = require("../validation/index");

// import asyncMySQL function
const asyncMySQL = require("../database/connection");

// import queries
const {
  addUser,
  deleteQuery,
  updateQuery,
  getQuery,
} = require("../database/queries");

// GET ROUTE:
// get user router
router.get("/", async (req, res) => {
  // ask sql for data
  // returns an array of results
  const results = await asyncMySQL(`SELECT * FROM users`);

  res.send({ status: 1, results });
});

// GET ROUTE:
// get a specific user router
router.get("/:id", async (req, res) => {
  // convert id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  // ask sql for data
  // returns an array of results
  const results = await asyncMySQL(`SELECT * FROM users WHERE id LIKE ${id}`);

  console.log(results);

  console.log(results);

  // check if the results are there
  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  // if the resuts are not there, communicate this
  res.send({ status: 0, reason: "Id not found" });
});

// POST ROUTE:
// add user router
router.post("/", async (req, res) => {
  // just console log the body
  console.log(req.body);

  // validate
  let localErrors = await validate(req.body, "addUser");

  // log local errors if any
  console.log(localErrors);

  // notify about validation errors and abort if any
  if (localErrors) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  //   destructuring the body
  const { firstName, lastName, number, email, dob, password } = req.body;

  // logical check (might be redundant due to the joi validator present . consider removing it)
  const firstBoolean =
    firstName &&
    typeof firstName === "string" &&
    lastName &&
    typeof lastName === "string" &&
    number &&
    typeof Number(number) === "number" &&
    email &&
    typeof email === "string" &&
    dob &&
    typeof dob === "string" &&
    password &&
    typeof password === "string";

  // defensive check
  if (!firstBoolean) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  // implementing the query
  try {
    await asyncMySQL(
      `INSERT INTO users (first_name, last_name, number, email, dob, password) 
              VALUES ("${firstName}", "${lastName}", "${number}", "${email}", STR_TO_DATE("${dob}", "%d/%m/%Y"), "${password}")`
    );
    // notifying the user of successful result
    res.send({ status: 1, message: "User added" });
    return;
  } catch (error) {
    // error message to the front
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// DELETE ROUTE:
// delete a user router
router.delete("/user/:id", async (req, res) => {
  // converting id from string to number
  const id = Number(req.params.id);

  // check if the id is number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  try {
    // run the query
    const result = await asyncMySQL(`DELETE FROM users WHERE id LIKE ${id}`);

    console.log(result);

    // check if the id exists and the user has been removed
    if (result.affectedRows === 1) {
      // send the successful update to the user
      res.send({ status: 1, message: "User removed" });
      return;
    }
    // if not, notify the user
    res.send({ status: 0, message: "Invalid id" });
    return;
  } catch (error) {
    // catch the error
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

// UPDATE ROUTE:
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

// exporting the router
module.exports = router;
